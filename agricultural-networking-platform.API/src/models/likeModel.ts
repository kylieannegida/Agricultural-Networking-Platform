import mongoose, { Schema } from 'mongoose';
import { ILike } from '../interfaces/likeInterface';

const likeSchema = new Schema<ILike>({
  LikeID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PostID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  ReactionType: { type: String, required: true },
});

export const Like = mongoose.model<ILike>('Like', likeSchema);
