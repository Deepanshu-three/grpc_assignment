import Quiz from "../models/question.model.js";

export const searchQuestions = async (call, callback) => {
  const { query, page, limit, questionType } = call.request;

  try {
    // Build the query object
    const searchQuery = {
      title: { $regex: query, $options: "i" },
      ...(questionType && { type: questionType }),
    };

    console.log("Search Query:", searchQuery);

    // Get total results count
    const totalResults = await Quiz.countDocuments(searchQuery);

    // Pagination
    const totalPages = Math.ceil(totalResults / limit);
    const skip = (page - 1) * limit;

    // Fetch paginated results
    const questions = await Quiz.find(searchQuery).skip(skip).limit(limit);

    console.log("Found Questions:", questions);

    // Create response
    const response = {
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        anagramType: q.anagramType,
        blocks: q.blocks,
        title: q.title,
      })),
      totalResults,
      totalPages,
    };

    callback(null, response);
  } catch (error) {
    console.error("Error in searchQuestions:", error);
    callback(error);
  }
};

export const showAllQuestions = async (call, callback) => {
  try {
    const questions = await Quiz.find({});
    const response = {
      questions: questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        anagramType: q.anagramType,
        blocks: q.blocks,
        title: q.title,
      })),
    };

    callback(null, response);
  } catch (error) {
    console.error("Error in showAllQuestions:", error);
    callback(error);
  }
};
