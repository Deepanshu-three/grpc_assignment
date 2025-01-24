import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["ANAGRAM", "MCQ", "READ_ALONG", "CONTENT_ONLY", "CONVERSATION"]
  },
  anagramType: {
    type: String,
    enum: ["WORD", "SENTENCE"],
    required: function () {
      return this.type === "ANAGRAM";
    }
  },
  blocks: [
    {
      text: { type: String, required: true },
      showInOption: { type: Boolean, default: false },
      isAnswer: { type: Boolean, default: false }
    }
  ],
  options: [
    {
      text: { type: String },
      isCorrectAnswer: { type: Boolean, default: false }
    }
  ],
  siblingId: { type: mongoose.Schema.Types.ObjectId, ref: "Sibling" },
  solution: { type: String },
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model("Quiz", QuizSchema);

export default Quiz;