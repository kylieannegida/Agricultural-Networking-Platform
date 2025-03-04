import mongoose, { Schema } from 'mongoose';
import { IComment } from '../interfaces/commentInterface';

const commentSchema = new Schema<IComment>({
  CommentID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PostID: { type: Number, required: true },
  Content: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  ParentCommentID: { type: Number },
  Mentions: { type: [String] },
  MediaURL: { type: String },
  Status: { type: String, required: true },
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
