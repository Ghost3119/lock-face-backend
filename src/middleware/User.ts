import type { Response, Request, NextFunction } from 'express';
import User, { IUser } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            user: IUser;
        }
    }
}

export async function validateUserExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}