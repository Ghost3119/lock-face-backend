import mongoose, { Schema, Document, Types } from 'mongoose';

const lockStatus = {
    OPEN: 'open',
    CLOSED: 'closed'
} as const;

export type LockStatus = typeof lockStatus[keyof typeof lockStatus];

export interface ILog {
    acceso: string;
    tipo: string;
    usuario: string;
    hora: string;
    dia: string;
}

export interface ILock extends Document {
    userId: Types.ObjectId;
    lockName: string;
    ubicationLock: string;
    configurationLock: string[];
    statusLock: LockStatus;
    logs: ILog[];
}

const logSchema: Schema = new Schema({
    acceso: { type: String, required: true },
    tipo: { type: String, required: true },
    usuario: { type: String, required: true },
    hora: { type: String, required: true },
    dia: { type: String, required: true }
});

const lockSchema: Schema = new Schema({
    lockName: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    ubicationLock: {
        type: String,
        required: true,
        trim: true
    },
    configurationLock: {
        type: [String],
        required: true,
        default: []
    },
    statusLock: {
        type: String,
        enum: Object.values(lockStatus),
        default: lockStatus.CLOSED
    },
    logs: [logSchema]
}, { timestamps: true });

const Lock = mongoose.model<ILock>('Lock', lockSchema);
export default Lock;
