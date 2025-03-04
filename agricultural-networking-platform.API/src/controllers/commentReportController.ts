import { Request, Response } from "express";
import { CommentReport } from "../models/commentReportModel";
import { ICommentReport } from "../interfaces/commentReportInterface";
import { validateCommentReport } from "../validations/CommentReportValidation";
import { BaseController } from "../controllers/baseController";

export class CommentReportController extends BaseController<ICommentReport> {
  constructor() {
    super(CommentReport);
  }

  // Create a new comment report with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommentReport(req.body);
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

  // Update an existing comment report with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommentReport(req.body);
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

  // Delete an existing comment report
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const commentReportId = req.params.id;
      if (!commentReportId) {
        res.status(400).json({ message: 'Comment report ID is required' });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
