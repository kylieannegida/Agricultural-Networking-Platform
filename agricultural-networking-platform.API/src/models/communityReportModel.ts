import mongoose, { Schema } from 'mongoose';
import { ICommunityReport } from '../interfaces/communityReportInterface';

const communityReportSchema = new Schema<ICommunityReport>({
  ReportID: { type: Number, required: true, unique: true },
  CommunityID: { type: Number, required: true },
  ReportedByUserID: { type: Number, required: true },
  Reason: { type: String, required: true },
  Status: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  ReviewedByAdmin: { type: Number },
  ReviewedAt: { type: Date },
  ActionTaken: { type: String },
});

export const CommunityReport = mongoose.model<ICommunityReport>('CommunityReport', communityReportSchema);
