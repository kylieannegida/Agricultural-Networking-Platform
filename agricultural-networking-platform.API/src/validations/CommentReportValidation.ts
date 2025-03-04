import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Comment Report Validation Schema
 * This follows the structured format with validation
 */
const commentReportValidationSchema = Joi.object({
  ReportID: Joi.number().required().messages({
    "any.required": "Report ID is required",
    "number.base": "Report ID must be a number",
  }),

  CommentID: Joi.number().required().messages({
    "any.required": "Comment ID is required",
    "number.base": "Comment ID must be a number",
  }),

  ReportedByUserID: Joi.number().required().messages({
    "any.required": "Reported By User ID is required",
    "number.base": "Reported By User ID must be a number",
  }),

  Reason: Joi.string().required().messages({
    "any.required": "Reason is required",
    "string.base": "Reason must be a string",
  }),

  Status: Joi.string().required().messages({
    "any.required": "Status is required",
    "string.base": "Status must be a string",
  }),

  CreatedAt: Joi.date().optional().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  ReviewedByAdmin: Joi.number().allow(null).messages({
    "number.base": "ReviewedByAdmin must be a number",
  }),

  ReviewedAt: Joi.date().allow(null).messages({
    "date.base": "ReviewedAt must be a valid date",
  }),

  ActionTaken: Joi.string().allow(null).messages({
    "string.base": "ActionTaken must be a string",
  }),
});

// Helper function to validate comment report data
export const validateCommentReport = (data: any) => {
  return commentReportValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate comment report data
export const validateCommentReportMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommentReport(req.body);

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