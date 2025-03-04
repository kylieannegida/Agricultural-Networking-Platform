import mongoose, { Document, Schema } from 'mongoose';
import { IFriendship } from '../interfaces/friendshipInterface';

interface friendshipInterface extends Document {
  FriendshipID: number;
  UserID1: number;
  UserID2: number;
  Status: string;
  CreatedAt: Date;
  UpdatedAt: Date;
}

const friendshipSchema = new Schema({
  FriendshipID: { type: Number, required: true, unique: true },
  UserID1: { type: Number, required: true },
  UserID2: { type: Number, required: true },
  Status: { type: String, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

export const Friendship = mongoose.model<IFriendship>('Friendship', friendshipSchema);
