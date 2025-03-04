import mongoose, { Schema } from 'mongoose';
import { ICommunityModerationLog } from '../interfaces/communityModerationLogInterface';

const communityModerationLogSchema = new Schema<ICommunityModerationLog>({
  LogID: { type: Number, required: true, unique: true },
  CommunityID: { type: Number, required: true },
  ModeratorUserID: { type: Number, required: true },
  ActionType: { type: String, required: true },
  TargetUserID: { type: Number },
  Timestamp: { type: Date, default: Date.now },
  Details: { type: String },
});

export const CommunityModerationLog = mongoose.model<ICommunityModerationLog>('CommunityModerationLog', communityModerationLogSchema);
