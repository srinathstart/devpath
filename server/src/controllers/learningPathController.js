import LearningPath from "../models/LearningPath.js";

export const createLearningPath = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required"
      });
    }

    const learningPath = await LearningPath.create({
      title,
      description,
      status,
      createdBy: req.userId
    });

    return res.status(201).json({
      success: true,
      message: "Learning path created successfully",
      learningPath
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getMyLearningPaths = async (req, res) => {
  try {
    const learningPaths = await LearningPath.find({
      createdBy: req.userId
    });

    return res.status(200).json({
      success: true,
      learningPaths
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const getLearningPathById = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found"
      });
    }

    if (learningPath.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to access this learning path"
      });
    }

    return res.status(200).json({
      success: true,
      learningPath
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const updateLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found"
      });
    }

    if (learningPath.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to update this learning path"
      });
    }

    const { title, description, status } = req.body;

    if (title !== undefined) learningPath.title = title;
    if (description !== undefined) learningPath.description = description;
    if (status !== undefined) learningPath.status = status;

    await learningPath.save();

    return res.status(200).json({
      success: true,
      message: "Learning path updated successfully",
      learningPath
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

export const deleteLearningPath = async (req, res) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return res.status(404).json({
        success: false,
        message: "Learning path not found"
      });
    }

    if (learningPath.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to delete this learning path"
      });
    }

    await learningPath.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Learning path deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};