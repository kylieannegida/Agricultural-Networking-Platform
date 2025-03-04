import { Request, Response } from "express";
import { CommunityEvent } from "../models/communityEventModel";
import { ICommunityEvent } from "../interfaces/communityEventInterface";
import { validateCommunityEvent } from "../validations/CommunityEventValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityEventController extends BaseController<ICommunityEvent> {
  constructor() {
    super(CommunityEvent);
  }

  // Create a new community event with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityEvent(req.body);
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

  // Update an existing community event with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityEvent(req.body);
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

  // Delete an existing community event
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const eventId = req.params.id;
      if (!eventId) {
        res.status(400).json({ message: 'Community event ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
