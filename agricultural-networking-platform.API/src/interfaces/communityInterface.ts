import { Document } from "mongoose";

export interface ICommunity extends Document {
    CommunityID: number;
    Name: string;
    Description?: string;
    Type: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    AdminUserID: number;
    MembersCount: number;
    PrivacyLevel: string;
    JoinRequestApprovalRequired: boolean;
    CoverPhoto?: string;
    Rules?: string[];
}
