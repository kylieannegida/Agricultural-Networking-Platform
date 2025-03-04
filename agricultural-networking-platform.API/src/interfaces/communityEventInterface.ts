import { Document } from "mongoose";

export interface ICommunityEvent extends Document {
    EventID: number;
    CommunityID: number;
    Name: string;
    Description?: string;
    StartDate: Date;
    EndDate: Date;
    Location?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    OrganizerUserID: number;
    Status: string;
}
