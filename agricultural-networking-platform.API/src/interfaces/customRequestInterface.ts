import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: { id: string; _id?: string }; // Ensure user object exists
}
