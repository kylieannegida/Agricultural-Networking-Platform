import { Request, Response } from "express";
import { Share } from "../models/shareModel";
import { IShare } from "../interfaces/shareInterface";
import { validateShare } from "../validations/ShareValidation";
import { BaseController } from "../controllers/baseController";

export class ShareController extends BaseController<IShare> {
  constructor() {
    super(Share);
  }

  // Create new share with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateShare(req.body);
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

  // Update share with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateShare(req.body);
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

  // Delete share
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const shareId = req.params.id;
      if (!shareId) {
        res.status(400).json({ message: "Share ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
