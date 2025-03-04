import mongoose, { Schema } from 'mongoose';
import { ICommunityPost } from '../interfaces/communityPostInterface';

const communityPostSchema = new Schema<ICommunityPost>({
  CommunityPostID: { type: Number, required: true, unique: true },
  CommunityID: { type: Number, required: true },
  PostID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  ApprovedByAdmin: { type: Number },
});

export const CommunityPost = mongoose.model<ICommunityPost>('CommunityPost', communityPostSchema);
