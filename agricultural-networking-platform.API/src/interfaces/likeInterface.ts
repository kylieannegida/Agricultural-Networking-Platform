import { Document } from "mongoose";

export interface ILike extends Document {
    LikeID: number;
    UserID: number;
    PostID: number;
    CreatedAt: Date;
    ReactionType: string;
}
