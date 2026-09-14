import express from 'express';
import dotenv from 'dotenv';
import healthRoutes from './routes/healthRoutes.js';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use('/api/health', healthRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});