import { Request, Response } from "express";
import { Community } from "../models/communityModel";
import { ICommunity } from "../interfaces/communityInterface";
import { validateCommunity } from "../validations/CommunityValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityController extends BaseController<ICommunity> {
  constructor() {
    super(Community);
  }

  // Create a new community with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunity(req.body);
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

  // Update an existing community with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunity(req.body);
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

  // Delete an existing community
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const communityId = req.params.id;
      if (!communityId) {
        res.status(400).json({ message: 'Community ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
