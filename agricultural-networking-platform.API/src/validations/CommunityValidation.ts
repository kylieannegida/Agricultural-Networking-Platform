import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Validation Schema
 * This follows the structured format with validation
 */
const communityValidationSchema = Joi.object({
  CommunityID: Joi.number().required().messages({
    "any.required": "CommunityID is required",
    "number.base": "CommunityID must be a number",
  }),
  
  Name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  
  Description: Joi.string().allow(null, "").optional().messages({
    "string.base": "Description must be a string",
  }),
  
  Type: Joi.string().required().messages({
    "any.required": "Type is required",
    "string.base": "Type must be a string",
  }),
  
  CreatedAt: Joi.date().required().messages({
    "date.base": "CreatedAt must be a valid date",
    "any.required": "CreatedAt is required",
  }),
  
  UpdatedAt: Joi.date().required().messages({
    "date.base": "UpdatedAt must be a valid date",
    "any.required": "UpdatedAt is required",
  }),
  
  AdminUserID: Joi.number().required().messages({
    "any.required": "AdminUserID is required",
    "number.base": "AdminUserID must be a number",
  }),
  
  MembersCount: Joi.number().default(0).messages({
    "number.base": "MembersCount must be a number",
  }),
  
  PrivacyLevel: Joi.string().required().messages({
    "any.required": "PrivacyLevel is required",
    "string.base": "PrivacyLevel must be a string",
  }),
  
  JoinRequestApprovalRequired: Joi.boolean().default(false).messages({
    "boolean.base": "JoinRequestApprovalRequired must be a boolean",
  }),
  
  CoverPhoto: Joi.string().uri().allow(null, "").optional().messages({
    "string.base": "CoverPhoto must be a string",
    "string.uri": "CoverPhoto must be a valid URL",
  }),
  
  Rules: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Rules must be an array of strings",
  }),
});

// Helper function to validate community data
export const validateCommunity = (data: any) => {
  return communityValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community data
export const validateCommunityMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommunity(req.body);

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