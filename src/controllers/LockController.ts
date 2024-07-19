import type { Request, Response } from 'express';
import Lock from '../models/Lock';

export class LockController {
    static createLock = async (req: Request, res: Response) => {
        try {
            const lock = new Lock(req.body);
            lock.userId = req.user.id;
            req.user.locks.push(lock.id);
            await Promise.allSettled([lock.save(), req.user.save()]);
            res.send('Lock created successfully');
        } catch (error) {
            console.log(error);
        }
    }
    static getAllLocks = async (req: Request, res: Response) => {
        try {
            const { userId } = req.params;
            const locks = await Lock.find({ userId });
            res.status(200).json(locks);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getLockById = async (req: Request, res: Response) => {
        try {
            res.json(req.lock);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updateLockById = async (req: Request, res: Response) => {
        try {
            await Lock.findByIdAndUpdate(req.lock.id, req.body);
            res.send('Lock updated successfully');
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updateLockStatusById = async (req: Request, res: Response) => {
        try {
            await Lock.findByIdAndUpdate(req.lock.id, req.body);
            res.send('Lock status updated successfully');
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updateLockConfigurationById = async (req: Request, res: Response) => {
        try {
            // Extraer configurationLock del cuerpo de la solicitud
            const { configurationLock } = req.body;

            // Verificar que configurationLock esté presente y sea un array
            if (!Array.isArray(configurationLock)) {
                return res.status(400).json({ message: 'Configuration lock must be an array' });
            }

            // Actualizar la cerradura
            await Lock.findByIdAndUpdate(req.lock.id, { configurationLock });
            res.send('Lock configuration updated successfully');
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static deleteLockById = async (req: Request, res: Response) => {
        try {
            req.user.locks = req.user.locks.filter((lock) =>
                lock.toString() !== req.lock.id.toString());
            await Promise.allSettled([req.lock.deleteOne(), req.user.save()]);
            res.send('Lock deleted successfully');
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static addLogToLock = async (req: Request, res: Response) => {
        try {
            const { lockId } = req.params;
            const log = req.body;
            const lock = await Lock.findById(lockId);
            if (!lock) {
                return res.status(404).json({ message: 'Lock not found' });
            }
            lock.logs.push(log);
            await lock.save();
            res.status(200).json(lock);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    static getAllLogsFromLock = async (req: Request, res: Response) => {
        try {
            const { lockId } = req.params;
            const lock = await Lock.findById(lockId);
            if (!lock) {
                return res.status(404).json({ message: 'Lock not found' });
            }
            res.status(200).json(lock.logs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}