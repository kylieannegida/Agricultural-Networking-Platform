import { Document } from "mongoose";

export interface IPost extends Document {
    PostID: number;
    UserID: number;
    Content: string;
    MediaURL?: string;
    Privacy: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    SharedFromPostID?: number;
    Location?: string;
    Tags?: string[];
    ReactionCount: number;
    CommentCount: number;
    ShareCount: number;
    PostType: string;
    EditedAt?: Date;
    VisibilitySettings: string;
}
