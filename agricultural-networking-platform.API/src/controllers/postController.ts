import { Request, Response } from "express";
import { Post } from "../models/postModel";
import { IPost } from "../interfaces/postInterface";
import { validatePost } from "../validations/PostValidation";
import { BaseController } from "../controllers/baseController";

export class PostController extends BaseController<IPost> {
  constructor() {
    super(Post);
  }

  // Create new post with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePost(req.body);
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

  // Update post with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePost(req.body);
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

  // Delete post
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(400).json({ message: "Post ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
