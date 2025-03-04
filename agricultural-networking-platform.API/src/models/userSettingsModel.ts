import mongoose, { Document, Schema } from 'mongoose';
import { IUserSettings } from '../interfaces/userSettingsInterface';

interface userSettingsInterface extends Document {
  SettingsID: number;
  UserID: number;
  PrivacySettings: string;
  NotificationSettings: string;
  LanguagePreference: string;
  Theme: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

const userSettingsSchema = new Schema({
  SettingsID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  PrivacySettings: { type: String, required: true },
  NotificationSettings: { type: String, required: true },
  LanguagePreference: { type: String, required: true },
  Theme: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

export const UserSettings = mongoose.model<IUserSettings>('UserSettings', userSettingsSchema);
