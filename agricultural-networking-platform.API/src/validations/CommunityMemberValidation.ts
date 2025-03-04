import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Member Validation Schema
 * This follows the structured format with validation
 */
const communityMemberValidationSchema = Joi.object({
  MemberID: Joi.number().required().messages({
    "any.required": "MemberID is required",
    "number.base": "MemberID must be a number",
  }),
  
  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),
  
  CommunityID: Joi.number().required().messages({
    "any.required": "CommunityID is required",
    "number.base": "CommunityID must be a number",
  }),
  
  Role: Joi.string().valid("Admin", "Moderator", "Member").required().messages({
    "any.required": "Role is required",
    "string.base": "Role must be a string",
    "any.only": "Role must be one of 'Admin', 'Moderator', or 'Member'",
  }),
  
  JoinedAt: Joi.date().required().messages({
    "date.base": "JoinedAt must be a valid date",
    "any.required": "JoinedAt is required",
  }),
  
  ApprovedBy: Joi.number().allow(null).optional().messages({
    "number.base": "ApprovedBy must be a number",
  }),
  
  Status: Joi.string().valid("Active", "Banned", "Pending").required().messages({
    "any.required": "Status is required",
    "string.base": "Status must be a string",
    "any.only": "Status must be one of 'Active', 'Banned', or 'Pending'",
  }),
  
  BannedUntil: Joi.date().allow(null).optional().messages({
    "date.base": "BannedUntil must be a valid date",
  }),
  
  MuteUntil: Joi.date().allow(null).optional().messages({
    "date.base": "MuteUntil must be a valid date",
  }),
  
  JoinRequestMessage: Joi.string().allow(null, "").optional().messages({
    "string.base": "JoinRequestMessage must be a string",
  }),
});

// Helper function to validate community member data
export const validateCommunityMember = (data: any) => {
  return communityMemberValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community member data
export const validateCommunityMemberMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommunityMember(req.body);

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
