import express from "express";
import {
  createLearningPath,
  getMyLearningPaths,
  getLearningPathById
} from "../controllers/learningPathController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, createLearningPath);
router.get("/", protect, getMyLearningPaths);
router.get("/:id", protect, getLearningPathById);

export default router;