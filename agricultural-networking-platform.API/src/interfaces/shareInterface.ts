import { Document } from "mongoose";

export interface IShare extends Document {
    ShareID: number;
    UserID: number;
    PostID: number;
    CreatedAt: Date;
    SharedMessage?: string;
    VisibilitySettings: string;
}
