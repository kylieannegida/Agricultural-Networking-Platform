import { Request, Response } from "express";
import { CommunityEventAttendee } from "../models/communityEventAttendeeModel";
import { ICommunityEventAttendee } from "../interfaces/communityEventAttendeeInterface";
import { validateCommunityEventAttendee } from "../validations/CommunityEventAttendeeValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityEventAttendeeController extends BaseController<ICommunityEventAttendee> {
  constructor() {
    super(CommunityEventAttendee);
  }

  // Create a new community event attendee with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityEventAttendee(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }
      req.body = payload; // Ensure validated payload is used
      await super.create(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Update an existing community event attendee with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityEventAttendee(req.body);
      if (error) {
        res.status(400).json({ message: error.details.map((err) => err.message) });
        return;
      }
      req.body = payload; // Ensure validated payload is used
      await super.update(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // Delete an existing community event attendee
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const attendeeId = req.params.id;
      if (!attendeeId) {
        res.status(400).json({ message: 'Community event attendee ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
