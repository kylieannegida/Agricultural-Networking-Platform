import { Request, Response } from "express";
import { Comment } from "../models/commentModel";
import { IComment } from "../interfaces/commentInterface";
import { validateComment } from "../validations/CommentValidation";
import { BaseController } from "../controllers/baseController";

export class CommentController extends BaseController<IComment> {
  constructor() {
    super(Comment);
  }

  // Create a new comment with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateComment(req.body);
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

  // Update an existing comment with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateComment(req.body);
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

  // Delete an existing comment
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const commentId = req.params.id;
      if (!commentId) {
        res.status(400).json({ message: 'Comment ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
