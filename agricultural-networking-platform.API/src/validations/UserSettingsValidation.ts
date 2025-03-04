import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * User Settings Validation Schema
 * This schema validates the user settings data
 */
const userSettingsValidationSchema = Joi.object({
  SettingsID: Joi.number().required().messages({
    "any.required": "SettingsID is required",
    "number.base": "SettingsID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),

  PrivacySettings: Joi.string()
    .valid("public", "friends-only", "private")
    .required()
    .messages({
      "any.required": "PrivacySettings is required",
      "string.base": "PrivacySettings must be a string",
      "any.only": "PrivacySettings must be one of: public, friends-only, private",
    }),

  NotificationSettings: Joi.string()
    .valid("all", "mentions-only", "none")
    .required()
    .messages({
      "any.required": "NotificationSettings is required",
      "string.base": "NotificationSettings must be a string",
      "any.only": "NotificationSettings must be one of: all, mentions-only, none",
    }),

  LanguagePreference: Joi.string().required().messages({
    "any.required": "LanguagePreference is required",
    "string.base": "LanguagePreference must be a string",
  }),

  Theme: Joi.string()
    .valid("light", "dark")
    .required()
    .messages({
      "any.required": "Theme is required",
      "string.base": "Theme must be a string",
      "any.only": "Theme must be either light or dark",
    }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  UpdatedAt: Joi.date().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),
});

// Helper function to validate user settings data
export const validateUserSettings = (data: any) => {
  return userSettingsValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate user settings data
export const validateUserSettingsMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateUserSettings(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  next();
};