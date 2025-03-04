import Joi from "joi";
import { Request, Response, NextFunction } from "express";

/**
 * Farmer Validation Schema
 * This schema validates the farmer data
 */
const farmerValidationSchema = Joi.object({
  FarmerID: Joi.number().required().messages({
    "any.required": "FarmerID is required",
    "number.base": "FarmerID must be a number",
  }),

  FullName: Joi.string().required().messages({
    "any.required": "FullName is required",
    "string.base": "FullName must be a string",
  }),

  Email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email address",
  }),

  PasswordHash: Joi.string().required().messages({
    "any.required": "PasswordHash is required",
    "string.base": "PasswordHash must be a string",
  }),

  ProfilePicture: Joi.string().uri().allow(null).messages({
    "string.uri": "ProfilePicture must be a valid URL",
  }),

  CoverPhoto: Joi.string().uri().allow(null).messages({
    "string.uri": "CoverPhoto must be a valid URL",
  }),

  Bio: Joi.string().allow(null).messages({
    "string.base": "Bio must be a string",
  }),

  Role: Joi.string().required().messages({
    "any.required": "Role is required",
    "string.base": "Role must be a string",
  }),

  CreatedAt: Joi.date().messages({
    "date.base": "CreatedAt must be a valid date",
  }),

  UpdatedAt: Joi.date().messages({
    "date.base": "UpdatedAt must be a valid date",
  }),

  Status: Joi.string().required().messages({
    "any.required": "Status is required",
    "string.base": "Status must be a string",
  }),

  PhoneNumber: Joi.string().allow(null).messages({
    "string.base": "PhoneNumber must be a string",
  }),

  Address: Joi.string().allow(null).messages({
    "string.base": "Address must be a string",
  }),

  LastLogin: Joi.date().allow(null).messages({
    "date.base": "LastLogin must be a valid date",
  }),

  AccountType: Joi.string().required().messages({
    "any.required": "AccountType is required",
    "string.base": "AccountType must be a string",
  }),
});

// Helper function to validate farmer data
export const validateFarmer = (data: any) => {
  return farmerValidationSchema.validate(data, { abortEarly: false });
};

// Middleware to validate farmer data
export const validateFarmerMiddlewareV2 = (req: Request, res: Response, next: NextFunction) => {
  const { error } = validateFarmer(req.body);

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