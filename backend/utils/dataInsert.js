import fs from "fs/promises"; // For reading the JSON file
import Quiz from "../models/question.model.js";

const insertData = async () => {
  try {
    // Read questions from JSON file
    const data = await fs.readFile("/home/deepanshu/coding/speakx/backend/questions.json", "utf-8");
    const questions = JSON.parse(data);

    // Insert into MongoDB
    await Quiz.insertMany(questions);
    console.log("Questions inserted successfully!");
  } catch (err) {
    console.error("Error inserting questions:", err);
  }
};

export { insertData };
