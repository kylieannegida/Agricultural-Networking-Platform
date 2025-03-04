import { Document } from "mongoose";

export interface IUserSettings extends Document {
    SettingsID: number;
    UserID: number;
    PrivacySettings: string;
    NotificationSettings: string;
    LanguagePreference: string;
    Theme: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
