import mongoose, { Schema } from 'mongoose';
import { ICommunity } from '../interfaces/communityInterface';

const communitySchema = new Schema<ICommunity>({
  CommunityID: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  Description: { type: String },
  Type: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  AdminUserID: { type: Number, required: true },
  MembersCount: { type: Number, default: 0 },
  PrivacyLevel: { type: String, required: true },
  JoinRequestApprovalRequired: { type: Boolean, default: false },
  CoverPhoto: { type: String },
  Rules: { type: [String] },
});

export const Community = mongoose.model<ICommunity>('Community', communitySchema);
