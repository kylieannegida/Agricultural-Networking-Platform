import { Request, Response } from "express";
import { CommentReaction } from "../models/commentReactionModel";
import { ICommentReaction } from "../interfaces/commentReactionInterface";
import { validateCommentReaction } from "../validations/CommentReactionValidation";
import { BaseController } from "../controllers/baseController";

export class CommentReactionController extends BaseController<ICommentReaction> {
  constructor() {
    super(CommentReaction);
  }

  // Create new comment reaction with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommentReaction(req.body);
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

  // Update comment reaction with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommentReaction(req.body);
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

  // Delete comment reaction
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const reactionId = req.params.id;
      if (!reactionId) {
        res.status(400).json({ message: "Comment reaction ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
