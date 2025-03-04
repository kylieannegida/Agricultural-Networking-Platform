import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Post Validation Schema
 * This follows the structured format with validation
 */
const communityPostValidationSchema = Joi.object({
  CommunityPostID: Joi.number().required().messages({
    "any.required": "CommunityPostID is required",
    "number.base": "CommunityPostID must be a number",
  }),
  
  CommunityID: Joi.number().required().messages({
    "any.required": "CommunityID is required",
    "number.base": "CommunityID must be a number",
  }),
  
  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),
  
  CreatedAt: Joi.date().required().messages({
    "date.base": "CreatedAt must be a valid date",
    "any.required": "CreatedAt is required",
  }),
  
  UpdatedAt: Joi.date().optional().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),
  
  ApprovedByAdmin: Joi.number().allow(null).optional().messages({
    "number.base": "ApprovedByAdmin must be a number",
  }),
});

// Helper function to validate community post data
export const validateCommunityPost = (data: any) => {
  return communityPostValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community post data
export const validateCommunityPostMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommunityPost(req.body);

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