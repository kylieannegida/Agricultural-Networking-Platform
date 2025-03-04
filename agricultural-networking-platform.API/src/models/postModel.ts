import mongoose, { Schema } from 'mongoose';
import { IPost } from '../interfaces/postInterface';

const postSchema = new Schema<IPost>({
  PostID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  Content: { type: String, required: true },
  MediaURL: { type: String },
  Privacy: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  SharedFromPostID: { type: Number },
  Location: { type: String },
  Tags: { type: [String] },
  ReactionCount: { type: Number, default: 0 },
  CommentCount: { type: Number, default: 0 },
  ShareCount: { type: Number, default: 0 },
  PostType: { type: String, required: true },
  EditedAt: { type: Date },
  VisibilitySettings: { type: String, required: true },
});

export const Post = mongoose.model<IPost>('Post', postSchema);
