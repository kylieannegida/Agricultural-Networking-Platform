import mongoose, { Schema } from 'mongoose';
import { IShare } from '../interfaces/shareInterface';

const shareSchema = new Schema<IShare>({
  ShareID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PostID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  SharedMessage: { type: String },
  VisibilitySettings: { type: String, required: true },
});

export const Share = mongoose.model<IShare>('Share', shareSchema);
