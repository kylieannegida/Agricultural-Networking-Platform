import { Document } from "mongoose";

export interface IPostTag extends Document {
    TagID: number;
    PostID: number;
    UserID: number;
    CreatedAt: Date;
}
