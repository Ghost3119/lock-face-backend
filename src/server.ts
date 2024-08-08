import express from "express"
import dotenv from "dotenv"
import cors from 'cors';
import morgan from "morgan"
import { connectDB } from "./config/db"
import { corsConfig } from "./config/cors"
import userRoutes from "./routes/userRoutes"
import lockRoutes from "./routes/lockRoutes"
import faceRoutes from "./routes/faceRoutes";

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", lockRoutes);
app.use("/api/faces", faceRoutes);


export default app;

