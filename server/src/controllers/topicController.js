import Topic from "../models/Topic.js";
import LearningPath from "../models/LearningPath.js";

export const createTopic = async (req, res) => {
  try {
    const { title, description, order, status, learningPathId } = req.body;

    if (!title || !learningPathId) {
      return res.status(400).json({
        success: false,
        message: "Title and learningPathId are required"
      });
    }

    const learningPath = await LearningPath.findById(learningPathId);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found"
      });
    }

    if (learningPath.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to add topics to this learning path"
      });
    }

    const topic = await Topic.create({
      title,
      description,
      order,
      status,
      learningPath: learningPathId,
      createdBy: req.userId
    });

    return res.status(201).json({
      success: true,
      message: "Topic created successfully",
      topic
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getTopicsByLearningPath = async (req, res) => {
  try {
    const { learningPathId } = req.params;

    const learningPath = await LearningPath.findById(learningPathId);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found"
      });
    }

    if (learningPath.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to access topics for this learning path"
      });
    }

    const topics = await Topic.find({
      learningPath: learningPathId
    }).sort({ order: 1 });

    return res.status(200).json({
      success: true,
      topics
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    if (topic.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this topic"
      });
    }

    const { title, description, order, status, confidence } = req.body;

    if (title !== undefined) topic.title = title;
    if (description !== undefined) topic.description = description;
    if (order !== undefined) topic.order = order;
    if (status !== undefined) topic.status = status;
    if (confidence !== undefined) topic.confidence = confidence;

    await topic.save();

    return res.status(200).json({
      success: true,
      message: "Topic updated successfully",
      topic
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    if (topic.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this topic"
      });
    }

    await topic.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Topic deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getReviewTopics = async (req, res) => {
  try {
    const topics = await Topic.find({
      createdBy: req.userId,
      confidence: {
        $in: ["dont-understand", "learning"]
      }
    }).sort({ updatedAt: -1 });

    return res.status(200).json({
      success: true,
      topics
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
