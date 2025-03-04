import { Document } from "mongoose";

export interface IFarmer extends Document {
    FarmerID: number;
    FullName: string;
    Email: string;
    PasswordHash: string;
    ProfilePicture?: string;
    CoverPhoto?: string;
    Bio?: string;
    Role: string;
    CreatedAt: Date;
    UpdatedAt: Date;
    Status: string;
    PhoneNumber?: string;
    Address?: string;
    LastLogin?: Date;
    AccountType: string;
}
