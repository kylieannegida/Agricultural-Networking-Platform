import { Document } from "mongoose";

export interface IPostReaction extends Document {
    ReactionID: number;
    UserID: number;
    PostID: number;
    ReactionType: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
