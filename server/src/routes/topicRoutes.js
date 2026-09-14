import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTopic,
  getTopicsByLearningPath,
  updateTopic,
  deleteTopic
} from "../controllers/topicController.js";


const router = express.Router();

router.post("/", protect, createTopic);
router.get(
  "/learning-path/:learningPathId",
  protect,
  getTopicsByLearningPath
);
router.patch("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);

export default router;