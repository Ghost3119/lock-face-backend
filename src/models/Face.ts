import { Schema, model, Document } from 'mongoose';

interface IFace extends Document {
    faceId: string;
    features: number[];
    user: Schema.Types.ObjectId;
    lock: Schema.Types.ObjectId;
}

const faceSchema = new Schema<IFace>({
    faceId: { type: String, required: true },
    features: { type: [Number], required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    lock: { type: Schema.Types.ObjectId, ref: 'Lock', required: true },
});

const Face = model<IFace>('Face', faceSchema);

export default Face;
