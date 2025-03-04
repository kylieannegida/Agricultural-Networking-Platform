import { Request, Response } from "express";
import { PostTag } from "../models/postTagModel";
import { IPostTag } from "../interfaces/postTagInterface";
import { validatePostTag } from "../validations/PostTagValidation";
import { BaseController } from "../controllers/baseController";

export class PostTagController extends BaseController<IPostTag> {
  constructor() {
    super(PostTag);
  }

  // Create new post tag with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostTag(req.body);
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

  // Update post tag with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostTag(req.body);
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

  // Delete post tag
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const postTagId = req.params.id;
      if (!postTagId) {
        res.status(400).json({ message: "Post tag ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
