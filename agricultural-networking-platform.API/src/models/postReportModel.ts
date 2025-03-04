import mongoose, { Schema } from 'mongoose';
import { IPostReport } from '../interfaces/postReportInterface';

const postReportSchema = new Schema<IPostReport>({
  ReportID: { type: Number, required: true, unique: true },
  PostID: { type: Number, required: true },
  ReportedByUserID: { type: Number, required: true },
  Reason: { type: String, required: true },
  Status: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  ReviewedByAdmin: { type: Number },
  ReviewedAt: { type: Date },
  ActionTaken: { type: String },
});

export const PostReport = mongoose.model<IPostReport>('PostReport', postReportSchema);
