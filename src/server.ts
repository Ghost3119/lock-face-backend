import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { connectDB } from "./config/db"
import userRoutes from "./routes/userRoutes"
import lockRoutes from "./routes/lockRoutes"

dotenv.config();

connectDB();

const app = express();

app.use(morgan("dev"));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/users", lockRoutes);


export default app;

