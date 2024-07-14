import type { Request, Response } from "express";
import User from "../models/User";

export class UserController {
    static createUser = async (req: Request, res: Response) => {

        const user = new User(req.body);

        try {
            await user.save();
            res.json({ message: "User created successfully" });
        } catch (error) {
            console.log(error);
        }
    }

    static getAllUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (error) {
            console.log(error);
        }
    }

    static getUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            console.log(error);
        }
    }

    static updateUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const user = await User.findByIdAndUpdate(userId, req.body);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            await user?.save();
            res.json({ message: "User updated successfully" });
        } catch (error) {
            console.log(error);
        }
    }

    static deleteUserById = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {
            const user = await User.findByIdAndDelete(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        } catch (error) {
            console.log(error);
        }
    }
}