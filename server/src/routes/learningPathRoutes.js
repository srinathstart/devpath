import express from "express";
import {
  createLearningPath,
  getMyLearningPaths,
  getLearningPathById,
  updateLearningPath,
  deleteLearningPath
} from "../controllers/learningPathController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, createLearningPath);
router.get("/", protect, getMyLearningPaths);
router.get("/:id", protect, getLearningPathById);
router.patch("/:id", protect, updateLearningPath);
router.delete("/:id", protect, deleteLearningPath);

export default router;