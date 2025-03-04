import mongoose, { Schema } from 'mongoose';
import { ICommunityMember } from '../interfaces/communityMemberInterface';

const communityMemberSchema = new Schema<ICommunityMember>({
  MemberID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  CommunityID: { type: Number, required: true },
  Role: { type: String, required: true },
  JoinedAt: { type: Date, default: Date.now },
  ApprovedBy: { type: Number },
  Status: { type: String, required: true },
  BannedUntil: { type: Date },
  MuteUntil: { type: Date },
  JoinRequestMessage: { type: String },
});

export const CommunityMember = mongoose.model<ICommunityMember>('CommunityMember', communityMemberSchema);
