import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Event Validation Schema
 */
const communityEventValidationSchema = Joi.object({
  EventID: Joi.number().required().messages({
    "any.required": "Event ID is required",
    "number.base": "Event ID must be a number",
  }),
  CommunityID: Joi.number().required().messages({
    "any.required": "Community ID is required",
    "number.base": "Community ID must be a number",
  }),
  Name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.base": "Name must be a string",
  }),
  Description: Joi.string().allow(null, "").messages({
    "string.base": "Description must be a string",
  }),
  StartDate: Joi.date().required().messages({
    "any.required": "Start Date is required",
    "date.base": "Start Date must be a valid date",
  }),
  EndDate: Joi.date().required().messages({
    "any.required": "End Date is required",
    "date.base": "End Date must be a valid date",
  }),
  Location: Joi.string().allow(null, "").messages({
    "string.base": "Location must be a string",
  }),
  CreatedAt: Joi.date().messages({
    "date.base": "Created At must be a valid date",
  }),
  UpdatedAt: Joi.date().messages({
    "date.base": "Updated At must be a valid date",
  }),
  OrganizerUserID: Joi.number().required().messages({
    "any.required": "Organizer User ID is required",
    "number.base": "Organizer User ID must be a number",
  }),
  Status: Joi.string().valid("Scheduled", "Cancelled", "Completed").required().messages({
    "any.required": "Status is required",
    "string.base": "Status must be a string",
    "any.only": "Status must be one of 'Scheduled', 'Cancelled', or 'Completed'",
  }),
});

// Helper function to validate community event data
export const validateCommunityEvent = (data: any) => {
  return communityEventValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community event data
export const validateCommunityEventMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateCommunityEvent(req.body);

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
