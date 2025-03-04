import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Post Report Validation Schema
 * This schema validates the post report data
 */
const postReportValidationSchema = Joi.object({
  ReportID: Joi.number().required().messages({
    "any.required": "ReportID is required",
    "number.base": "ReportID must be a number",
  }),

  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),

  ReportedByUserID: Joi.number().required().messages({
    "any.required": "ReportedByUserID is required",
    "number.base": "ReportedByUserID must be a number",
  }),

  Reason: Joi.string().required().messages({
    "any.required": "Reason is required",
    "string.base": "Reason must be a string",
  }),

  Status: Joi.string()
    .valid("pending", "reviewed", "resolved")
    .required()
    .messages({
      "any.required": "Status is required",
      "string.base": "Status must be a string",
      "any.only": "Status must be one of: pending, reviewed, resolved",
    }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  ReviewedByAdmin: Joi.number().messages({
    "number.base": "ReviewedByAdmin must be a number",
  }),

  ReviewedAt: Joi.date().messages({
    "date.base": "ReviewedAt must be a valid date",
  }),

  ActionTaken: Joi.string().messages({
    "string.base": "ActionTaken must be a string",
  }),
});

// Helper function to validate post report data
export const validatePostReport = (data: any) => {
  return postReportValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate post report data
export const validatePostReportMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validatePostReport(req.body);

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