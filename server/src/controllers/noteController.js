import Note from "../models/Note.js";
import Topic from "../models/Topic.js";

export const createNote = async (req, res) => {
  try {
    const { title, content, tags, topicId } = req.body;

    if (!title || !content || !topicId) {
      return res.status(400).json({
        success: false,
        message: "Title, content and topicId are required"
      });
    }

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    if (topic.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to add notes to this topic"
      });
    }

    const note = await Note.create({
      title,
      content,
      tags,
      topic: topicId,
      createdBy: req.userId
    });

    return res.status(201).json({
      success: true,
      message: "Note created successfully",
      note
    });

  } catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: "Server error"
  });
  }
};

export const getNotesByTopic = async (req, res) => {
  try {
    const { topicId } = req.params;

    const topic = await Topic.findById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: "Topic not found"
      });
    }

    if (topic.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "Not allowed to access notes for this topic"
      });
    }

    const notes = await Note.find({
      topic: topicId
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};