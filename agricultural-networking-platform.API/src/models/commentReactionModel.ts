import mongoose, { Schema } from 'mongoose';
import { ICommentReaction } from '../interfaces/commentReactionInterface';

const commentReactionSchema = new Schema<ICommentReaction>({
  ReactionID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  CommentID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  ReactionType: { type: String, required: true },
});

export const CommentReaction = mongoose.model<ICommentReaction>('CommentReaction', commentReactionSchema);
