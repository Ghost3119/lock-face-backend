import mongoose from "mongoose";
import colors from "colors";
import { exit } from "node:process";

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log(colors.green(`MongoDB connected: ${connection.connection.host}`));
    } catch (error) {
        console.log(colors.red(`Error: ${error.message}`));
        exit(1);
    }
}