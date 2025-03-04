import { Document } from "mongoose";

export interface ICommentReaction extends Document {
    ReactionID: number;
    UserID: number;
    CommentID: number;
    CreatedAt: Date;
    ReactionType: string;
}
