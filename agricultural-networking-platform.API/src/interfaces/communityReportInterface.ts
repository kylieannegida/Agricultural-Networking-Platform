import { Document } from "mongoose";

export interface ICommunityReport extends Document {
    ReportID: number;
    CommunityID: number;
    ReportedByUserID: number;
    Reason: string;
    Status: string;
    CreatedAt: Date;
    ReviewedByAdmin?: number;
    ReviewedAt?: Date;
    ActionTaken?: string;
}
