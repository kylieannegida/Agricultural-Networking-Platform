import { Document } from "mongoose";

export interface IPostReport extends Document {
    ReportID: number;
    PostID: number;
    ReportedByUserID: number;
    Reason: string;
    Status: string;
    CreatedAt: Date;
    ReviewedByAdmin?: number;
    ReviewedAt?: Date;
    ActionTaken?: string;
}
