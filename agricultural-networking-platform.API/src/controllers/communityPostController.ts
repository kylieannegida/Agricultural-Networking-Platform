import { Request, Response } from "express";
import { CommunityPost } from "../models/communityPostModel";
import { ICommunityPost } from "../interfaces/communityPostInterface";
import { validateCommunityPost } from "../validations/CommunityPostValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityPostController extends BaseController<ICommunityPost> {
  constructor() {
    super(CommunityPost);
  }

  // Create new community post with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityPost(req.body);
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

  // Update community post with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityPost(req.body);
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

  // Delete community post
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const postId = req.params.id;
      if (!postId) {
        res.status(400).json({ message: "Community post ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}