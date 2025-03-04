import { Document } from "mongoose";

export interface IBlockedUsers extends Document {
    BlockID: number;
    UserID: number;
    BlockedUserID: number;
    CreatedAt: Date;
    Reason: string;
}
