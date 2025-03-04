import mongoose, { Schema } from 'mongoose';
import { ICommentReport } from '../interfaces/commentReportInterface';

const commentReportSchema = new Schema<ICommentReport>({
  ReportID: { type: Number, required: true, unique: true },
  CommentID: { type: Number, required: true },
  ReportedByUserID: { type: Number, required: true },
  Reason: { type: String, required: true },
  Status: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  ReviewedByAdmin: { type: Number },
  ReviewedAt: { type: Date },
  ActionTaken: { type: String },
});

export const CommentReport = mongoose.model<ICommentReport>('CommentReport', commentReportSchema);
