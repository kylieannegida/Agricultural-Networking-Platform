import { Request, Response } from "express";
import { BlockedUsers } from "../models/blockedUsersModel";
import { IBlockedUsers } from "../interfaces/blockedUsersInterface";
import { validateBlockedUsers } from "../validations/BlockedUsersValidation";
import { BaseController } from "../controllers/baseController";

export class BlockedUsersController extends BaseController<IBlockedUsers> {
  constructor() {
    super(BlockedUsers);
  }

  // Create a new blocked user entry with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateBlockedUsers(req.body);
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

  // Update an existing blocked user with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateBlockedUsers(req.body);
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

  // Delete an existing blocked user
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const blockedUserId = req.params.id;
      if (!blockedUserId) {
        res.status(400).json({ message: 'Blocked user ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
