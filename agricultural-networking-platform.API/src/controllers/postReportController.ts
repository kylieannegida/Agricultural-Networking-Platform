import { Request, Response } from "express";
import { PostReport } from "../models/postReportModel";
import { IPostReport } from "../interfaces/postReportInterface";
import { validatePostReport } from "../validations/PostReportValidation";
import { BaseController } from "../controllers/baseController";

export class PostReportController extends BaseController<IPostReport> {
  constructor() {
    super(PostReport);
  }

  // Create new post report with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostReport(req.body);
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

  // Update post report with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validatePostReport(req.body);
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

  // Delete post report
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const postReportId = req.params.id;
      if (!postReportId) {
        res.status(400).json({ message: "Post report ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
