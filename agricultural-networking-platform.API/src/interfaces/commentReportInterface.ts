import { Document } from "mongoose";

export interface ICommentReport extends Document {
    ReportID: number;
    CommentID: number;
    ReportedByUserID: number;
    Reason: string;
    Status: string;
    CreatedAt: Date;
    ReviewedByAdmin?: number;
    ReviewedAt?: Date;
    ActionTaken?: string;
}
