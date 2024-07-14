import type { Response, Request, NextFunction } from 'express';
import Lock, { ILock } from '../models/Lock';

declare global {
    namespace Express {
        interface Request {
            lock: ILock;
        }
    }
}

export function lockBelongsToUser(req: Request, res: Response, next: NextFunction) {
    if (req.lock.userId.toString() !== req.user.id.toString()) {
        const error = new Error('Lock not found');
        return res.status(404).json({ message: error.message });
    }
    next();
}

export async function lockExists(req: Request, res: Response, next: NextFunction) {
    try {
        const { lockId } = req.params;
        const lock = await Lock.findById(lockId);
        if (!lock) {
            return res.status(404).json({ message: 'Lock not found' });
        }
        req.lock = lock;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }

}