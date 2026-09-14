import express from 'express';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import learningPathRoutes from "./routes/learningPathRoutes.js";
import topicRoutes from "./routes/topicRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/health', healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/learning-paths", learningPathRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/notes", noteRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});