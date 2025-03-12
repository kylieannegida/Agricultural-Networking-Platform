import { Document } from "mongoose";

export interface IUser extends Document {
  user?: { id: string };
  email: string;
  password: string;
  Verified: boolean;
}