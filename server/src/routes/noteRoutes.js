import express from "express";
import {
  createNote,
  getNotesByTopic
} from "../controllers/noteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);

router.get(
  "/topic/:topicId",
  protect,
  getNotesByTopic
);

export default router;