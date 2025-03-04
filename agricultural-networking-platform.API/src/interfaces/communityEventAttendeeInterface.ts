import { Document } from "mongoose";

export interface ICommunityEventAttendee extends Document {
    AttendeeID: number;
    EventID: number;
    UserID: number;
    RSVPStatus: string;
    JoinedAt: Date;
}
