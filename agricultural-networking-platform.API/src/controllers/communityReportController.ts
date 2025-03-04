import { Request, Response } from "express";
import { CommunityReport } from "../models/communityReportModel";
import { ICommunityReport } from "../interfaces/communityReportInterface";
import { validateCommunityReport } from "../validations/CommunityReportValidation";
import { BaseController } from "../controllers/baseController";

export class CommunityReportController extends BaseController<ICommunityReport> {
  constructor() {
    super(CommunityReport);
  }

  // Create new community report with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityReport(req.body);
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

  // Update community report with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateCommunityReport(req.body);
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

  // Delete community report
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const reportId = req.params.id;
      if (!reportId) {
        res.status(400).json({ message: "Community report ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
