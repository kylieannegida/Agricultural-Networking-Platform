import mongoose, { Schema } from 'mongoose';
import { IPostTag } from '../interfaces/postTagInterface';

const postTagSchema = new Schema<IPostTag>({
  TagID: { type: Number, required: true, unique: true },
  PostID: { type: Number, required: true },
  UserID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
});

export const PostTag = mongoose.model<IPostTag>('PostTag', postTagSchema);
