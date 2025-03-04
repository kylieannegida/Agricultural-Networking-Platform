import { Request, Response } from "express";
import { UserSettings } from "../models/userSettingsModel";
import { IUserSettings } from "../interfaces/userSettingsInterface";
import { validateUserSettings } from "../validations/UserSettingsValidation";
import { BaseController } from "../controllers/baseController";

export class UserSettingsController extends BaseController<IUserSettings> {
  constructor() {
    super(UserSettings);
  }

  // Create new user settings with validation
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateUserSettings(req.body);
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

  // Update user settings with validation
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { error, value: payload } = validateUserSettings(req.body);
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

  // Delete user settings
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const settingsId = req.params.id;
      if (!settingsId) {
        res.status(400).json({ message: "User settings ID is required" });
        return;
      }
      await super.delete(req, res);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
