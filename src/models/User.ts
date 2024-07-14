import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ILock } from "./Lock";

export interface IUser extends
    Document {
    nameUser: string;
    numberUser: string;
    emailUser: string;
    passwordUser: string;
    roleUser: string;
    photoUser: string;
    locks: PopulatedDoc<ILock & Document>[];
}

const userSchema: Schema = new Schema({
    nameUser: {
        type: String,
        required: true,
        trim: true
    },
    numberUser: {
        type: String,
        required: true,
        trim: true
    },
    emailUser: {
        type: String,
        required: true,
        trim: true
    },
    passwordUser: {
        type: String,
        required: true,
        trim: true
    },
    roleUser: {
        type: String,
        required: true,
        trim: true
    },
    photoUser: {
        type: String,
        required: true,
        trim: true
    },
    locks: [
        {
            type: Types.ObjectId,
            ref: 'Lock'
        }
    ]
}, { timestamps: true });

const User = mongoose.model<IUser>('User', userSchema);
export default User;