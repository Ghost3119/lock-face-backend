import type { Request, Response } from "express";
import User from "../models/User";
import jwt from 'jsonwebtoken';


export class UserController {
    static async loginUser(req: Request, res: Response) {
        try {
            const { emailUser, passwordUser } = req.body;
            console.log("Login attempt:", { emailUser, passwordUser });


            const user = await User.findOne({ emailUser, passwordUser });

            console.log("User found:", user);

            if (!user) {
                console.log("Invalid credentials");
                return res.status(404).json({ message: 'Invalid credentials' });
            }

            if (!process.env.JWT_SECRET) {
                throw new Error('JWT_SECRET is not defined');
            }

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '2h'
            });

            console.log("Login successful, token generated");
            res.status(200).json({ token, user });
        } catch (error) {
            console.error("Internal server error:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

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