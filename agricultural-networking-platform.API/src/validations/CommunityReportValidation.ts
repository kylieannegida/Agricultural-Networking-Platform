import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Report Validation Schema
 * This follows the structured format with validation
 */
const communityReportValidationSchema = Joi.object({
  ReportID: Joi.number().optional().messages({
    "number.base": "ReportID must be a number",
  }),
  
  CommunityID: Joi.number().required().messages({
    "any.required": "CommunityID is required",
    "number.base": "CommunityID must be a number",
  }),
  
  ReportedByUserID: Joi.number().required().messages({
    "any.required": "ReportedByUserID is required",
    "number.base": "ReportedByUserID must be a number",
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

// Helper function to validate community report data
export const validateCommunityReport = (data: any) => {
  return communityReportValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community report data
export const validateCommunityReportMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommunityReport(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      errors: error.details.map((err) => ({
        field: err.path.join(". "),
        message: err.message,
      })),
    });
  }

  next();
};
