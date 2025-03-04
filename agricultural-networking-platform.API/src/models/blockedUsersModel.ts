import mongoose, { Document, Schema } from 'mongoose';
import { IBlockedUsers } from '../interfaces/blockedUsersInterface';

const BlockReasons = ["Spam", "Harassment", "Inappropriate Content", "Other"] as const;
type BlockReason = (typeof BlockReasons)[number];

interface blockedUsersInterface extends Document {
  BlockID: number;
  UserID: number;
  BlockedUserID: number;
  CreatedAt: Date;
  Reason: BlockReason;
}

const blockedUsersSchema = new Schema({
  BlockID: { type: Number, required: true, unique: true },
  UserID: { type: Number, required: true },
  BlockedUserID: { type: Number, required: true },
  CreatedAt: { type: Date, default: Date.now },
  Reason: { type: String, required: true, enum: BlockReasons },
});

export const BlockedUsers = mongoose.model<IBlockedUsers>('BlockedUsers', blockedUsersSchema);
