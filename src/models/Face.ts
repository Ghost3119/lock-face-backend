import { Schema, model, Document } from 'mongoose';

interface IFace extends Document {
    image: string;
    user: Schema.Types.ObjectId;
    lock: Schema.Types.ObjectId;
}

const faceSchema = new Schema<IFace>({
    image: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', required: true
    },
    lock: {
        type: Schema.Types.ObjectId,
        ref: 'Lock', required: true
    },
});

const Face = model<IFace>('Face', faceSchema);

export default Face;
