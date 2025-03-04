import mongoose, { Schema } from 'mongoose';
import { ICommunityEvent } from '../interfaces/communityEventInterface';

const communityEventSchema = new Schema<ICommunityEvent>({
  EventID: { type: Number, required: true, unique: true },
  CommunityID: { type: Number, required: true },
  Name: { type: String, required: true },
  Description: { type: String },
  StartDate: { type: Date, required: true },
  EndDate: { type: Date, required: true },
  Location: { type: String },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
  OrganizerUserID: { type: Number, required: true },
  Status: { type: String, required: true },
});

export const CommunityEvent = mongoose.model<ICommunityEvent>('CommunityEvent', communityEventSchema);
