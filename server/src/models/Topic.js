import mongoose from "mongoose";

const topicSchema = new mongoose.Schema(
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

    order: {
      type: Number,
      default: 0
    },

    status: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started"
    },

    learningPath: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LearningPath",
      required: true
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

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;