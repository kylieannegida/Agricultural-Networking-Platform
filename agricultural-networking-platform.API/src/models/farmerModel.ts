import mongoose, { Document, Schema } from 'mongoose';
import { IFarmer } from '../interfaces/farmerInterface';

interface farmerInterface extends Document {
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

const farmerSchema = new Schema({
  FarmerID: { type: Number, required: true, unique: true },
  FullName: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  PasswordHash: { type: String, required: true },
  ProfilePicture: { type: String },
  CoverPhoto: { type: String },
  Bio: { type: String },
  Role: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  Status: { type: String, required: true },
  PhoneNumber: { type: String },
  Address: { type: String },
  LastLogin: { type: Date },
  AccountType: { type: String, required: true },
});

export const Farmer = mongoose.model<IFarmer>('Farmer', farmerSchema);
