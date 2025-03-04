import { Document } from "mongoose";

export interface ICommunityPost extends Document {
    CommunityPostID: number;
    CommunityID: number;
    PostID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
    ApprovedByAdmin?: number;
}
