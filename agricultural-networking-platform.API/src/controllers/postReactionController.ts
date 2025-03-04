import { Request, Response } from "express";
import { PostReaction } from "../models/postReactionModel";
import { IPostReaction } from "../interfaces/postReactionInterface";
import { validatePostReaction } from "../validations/PostReactionValidation";
import { BaseController } from "../controllers/baseController";

export class PostReactionController extends BaseController<IPostReaction> {
  constructor() {
    super(PostReaction);
  }

  // Create new post reaction with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostReaction(req.body);
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

  // Update post reaction with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostReaction(req.body);
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

  // Delete post reaction
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const postReactionId = req.params.id;
      if (!postReactionId) {
        res.status(400).json({ message: "Post reaction ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
