import { Request, Response } from "express";
import { Like } from "../models/likeModel";
import { ILike } from "../interfaces/likeInterface";
import { validateLike } from "../validations/LikeValidation";
import { BaseController } from "../controllers/baseController";

export class LikeController extends BaseController<ILike> {
  constructor() {
    super(Like);
  }

  // Create new like with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLike(req.body);
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

  // Update like with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateLike(req.body);
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

  // Delete like
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const likeId = req.params.id;
      if (!likeId) {
        res.status(400).json({ message: "Like ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
