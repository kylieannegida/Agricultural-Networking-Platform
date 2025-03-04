import { Document } from "mongoose";

export interface ICommunityMember extends Document {
    MemberID: number;
    UserID: number;
    CommunityID: number;
    Role: string;
    JoinedAt: Date;
    ApprovedBy?: number;
    Status: string;
    BannedUntil?: Date;
    MuteUntil?: Date;
    JoinRequestMessage?: string;
}
