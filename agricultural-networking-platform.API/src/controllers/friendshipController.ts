import { Request, Response } from "express";
import { Friendship } from "../models/friendshipModel";
import { IFriendship } from "../interfaces/friendshipInterface";
import { validateFriendship } from "../validations/FriendshipValidation";
import { BaseController } from "../controllers/baseController";

export class FriendshipController extends BaseController<IFriendship> {
  constructor() {
    super(Friendship);
  }

  // Create new friendship with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFriendship(req.body);
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

  // Update friendship with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFriendship(req.body);
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

  // Delete friendship
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const friendshipId = req.params.id;
      if (!friendshipId) {
        res.status(400).json({ message: "Friendship ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
