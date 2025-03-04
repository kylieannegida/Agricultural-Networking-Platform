import mongoose, { Schema } from 'mongoose';
import { ICommunityEventAttendee } from '../interfaces/communityEventAttendeeInterface';

const communityEventAttendeeSchema = new Schema<ICommunityEventAttendee>({
  AttendeeID: { type: Number, required: true, unique: true },
  EventID: { type: Number, required: true },
  UserID: { type: Number, required: true },
  RSVPStatus: { type: String, required: true },
  JoinedAt: { type: Date, default: Date.now },
});

export const CommunityEventAttendee = mongoose.model<ICommunityEventAttendee>('CommunityEventAttendee', communityEventAttendeeSchema);
