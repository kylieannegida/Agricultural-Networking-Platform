import mongoose, { Schema } from 'mongoose';
import { IPostReaction } from '../interfaces/postReactionInterface';

const postReactionSchema = new Schema<IPostReaction>({
  ReactionID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PostID: { type: Number, required: true },
  ReactionType: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

export const PostReaction = mongoose.model<IPostReaction>('PostReaction', postReactionSchema);
