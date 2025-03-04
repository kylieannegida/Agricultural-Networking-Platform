import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Community Event Attendee Validation Schema
 * This follows the structured format with validation
 */
const communityEventAttendeeValidationSchema = Joi.object({
  AttendeeID: Joi.number().optional().messages({
    "number.base": "AttendeeID must be a number",
  }),
  
  EventID: Joi.number().required().messages({
    "any.required": "EventID is required",
    "number.base": "EventID must be a number",
  }),
  
  UserID: Joi.number().required().messages({
    "any.required": "UserID is required",
    "number.base": "UserID must be a number",
  }),
  
  RSVPStatus: Joi.string().valid("Going", "Interested", "Not Going").required().messages({
    "any.required": "RSVPStatus is required",
    "string.base": "RSVPStatus must be a string",
    "any.only": "RSVPStatus must be one of 'Going', 'Interested', or 'Not Going'",
  }),
  
  JoinedAt: Joi.date().optional().messages({
    "date.base": "JoinedAt must be a valid date",
  }),
});

// Helper function to validate community event attendee data
export const validateCommunityEventAttendee = (data: any) => {
  return communityEventAttendeeValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate community event attendee data
export const validateCommunityEventAttendeeMiddlewareV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateCommunityEventAttendee(req.body);

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
