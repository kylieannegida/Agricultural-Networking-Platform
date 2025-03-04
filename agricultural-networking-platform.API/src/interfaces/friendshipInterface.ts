import { Document } from "mongoose";

export interface IFriendship extends Document {
    FriendshipID: number;
    UserID1: number;
    UserID2: number;
    Status: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
