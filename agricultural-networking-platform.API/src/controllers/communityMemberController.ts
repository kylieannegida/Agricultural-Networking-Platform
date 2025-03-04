import { Request, Response } from "express";
import { CommunityMember } from "../models/communityMemberModel";
import { ICommunityMember } from "../interfaces/communityMemberInterface";
import { validateCommunityMember } from "../validations/CommunityMemberValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityMemberController extends BaseController<ICommunityMember> {
  constructor() {
    super(CommunityMember);
  }

  // Create a new community member with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityMember(req.body);
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

  // Update an existing community member with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityMember(req.body);
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

  // Delete an existing community member
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const memberId = req.params.id;
      if (!memberId) {
        res.status(400).json({ message: 'Community member ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
