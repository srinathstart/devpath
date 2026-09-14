import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTopic,
  getTopicsByLearningPath
} from "../controllers/topicController.js";

const router = express.Router();

router.post("/", protect, createTopic);
router.get(
  "/learning-path/:learningPathId",
  protect,
  getTopicsByLearningPath
);

export default router;