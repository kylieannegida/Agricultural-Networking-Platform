import { Request, Response } from "express";
import { Farmer } from "../models/farmerModel";
import { IFarmer } from "../interfaces/farmerInterface";
import { validateFarmer } from "../validations/FarmerValidation";
import { BaseController } from "../controllers/baseController";

export class FarmerController extends BaseController<IFarmer> {
  constructor() {
    super(Farmer);
  }

  // Create new farmer with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFarmer(req.body);
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

  // Update farmer with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateFarmer(req.body);
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

  // Delete farmer
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const farmerId = req.params.id;
      if (!farmerId) {
        res.status(400).json({ message: "Farmer ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
