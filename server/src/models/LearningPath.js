import mongoose from "mongoose";

const learningPathSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["active", "completed", "paused"],
      default: "active"
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const LearningPath = mongoose.model(
  "LearningPath",
  learningPathSchema
);

export default LearningPath;