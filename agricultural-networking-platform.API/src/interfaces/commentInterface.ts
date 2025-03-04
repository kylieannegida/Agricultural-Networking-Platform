import { Document } from "mongoose";

export interface IComment extends Document {
    CommentID: number;
    UserID: number;
    PostID: number;
    Content: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    ParentCommentID?: number;
    Mentions?: string[];
    MediaURL?: string;
    Status: string;
}
