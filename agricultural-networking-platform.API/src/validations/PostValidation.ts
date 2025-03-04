import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Post Validation Schema
 * This schema validates the post data
 */
const postValidationSchema = Joi.object({
  PostID: Joi.number().required().messages({
    "any.required": "PostID is required",
    "number.base": "PostID must be a number",
  }),

  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),

  Content: Joi.string().required().messages({
    "any.required": "Content is required",
    "string.base": "Content must be a string",
  }),

  MediaURL: Joi.string().uri().optional().messages({
    "string.uri": "MediaURL must be a valid URL",
  }),

  Privacy: Joi.string().required().messages({
    "any.required": "Privacy is required",
    "string.base": "Privacy must be a string",
  }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  UpdatedAt: Joi.date().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),

  SharedFromPostID: Joi.number().optional().messages({
    "number.base": "SharedFromPostID must be a number",
  }),

  Location: Joi.string().optional().messages({
    "string.base": "Location must be a string",
  }),

  Tags: Joi.array().items(Joi.string()).optional().messages({
    "array.base": "Tags must be an array of strings",
  }),

  ReactionCount: Joi.number().default(0).messages({
    "number.base": "ReactionCount must be a number",
  }),

  CommentCount: Joi.number().default(0).messages({
    "number.base": "CommentCount must be a number",
  }),

  ShareCount: Joi.number().default(0).messages({
    "number.base": "ShareCount must be a number",
  }),

  PostType: Joi.string().required().messages({
    "any.required": "PostType is required",
    "string.base": "PostType must be a string",
  }),

  EditedAt: Joi.date().optional().messages({
    "date.base": "EditedAt must be a valid date",
  }),

  VisibilitySettings: Joi.string().required().messages({
    "any.required": "VisibilitySettings is required",
    "string.base": "VisibilitySettings must be a string",
  }),
});

// Helper function to validate post data
export const validatePost = (data: any) => {
  return postValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate post data
export const validatePostMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validatePost(req.body);

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