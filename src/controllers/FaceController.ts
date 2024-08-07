import type { Request, Response } from 'express';
import Face from '../models/Face';
import User from '../models/User';
import Lock from '../models/Lock';

export class FaceController {
    static createFace = async (req: Request, res: Response) => {
        const { userId, lockId } = req.params;
        const { faceId, features } = req.body;

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const lock = await Lock.findById(lockId);
            if (!lock) {
                return res.status(404).json({ message: 'Lock not found' });
            }

            const face = new Face({ faceId, features, user: user._id, lock: lock._id });
            await face.save();

            res.status(201).json({ message: 'Face created successfully', face });
        } catch (error) {
            console.error('Error creating face:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getAllFaces = async (req: Request, res: Response) => {
        try {
            const faces = await Face.find({});
            res.status(200).json(faces);
        } catch (error) {
            console.error('Error getting all faces:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getFaceById = async (req: Request, res: Response) => {
        const { faceId } = req.params;

        try {
            const face = await Face.findById(faceId);
            if (!face) {
                return res.status(404).json({ message: 'Face not found' });
            }
            res.status(200).json(face);
        } catch (error) {
            console.error('Error getting face by ID:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static updateFaceById = async (req: Request, res: Response) => {
        const { faceId } = req.params;
        const { faceId: newFaceId, features } = req.body;

        try {
            const face = await Face.findByIdAndUpdate(faceId, { faceId: newFaceId, features }, { new: true });
            if (!face) {
                return res.status(404).json({ message: 'Face not found' });
            }
            res.status(200).json({ message: 'Face updated successfully', face });
        } catch (error) {
            console.error('Error updating face:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static deleteFaceById = async (req: Request, res: Response) => {
        const { faceId } = req.params;

        try {
            const face = await Face.findByIdAndDelete(faceId);
            if (!face) {
                return res.status(404).json({ message: 'Face not found' });
            }
            res.status(200).json({ message: 'Face deleted successfully' });
        } catch (error) {
            console.error('Error deleting face:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getFacesByUser = async (req: Request, res: Response) => {
        const { userId } = req.params;

        try {
            const faces = await Face.find({ userId });
            res.status(200).json(faces);
        } catch (error) {
            console.error('Error getting faces by user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static getFacesByLock = async (req: Request, res: Response) => {
        const { lockId } = req.params;

        try {
            const faces = await Face.find({ lockId });
            res.status(200).json(faces);
        } catch (error) {
            console.error('Error getting faces by lock:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static searchFacesByFeatures = async (req: Request, res: Response) => {
        const { features } = req.body;

        try {
            const faces = await Face.find({ features: { $all: features } });
            res.status(200).json(faces);
        } catch (error) {
            console.error('Error searching faces by features:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
