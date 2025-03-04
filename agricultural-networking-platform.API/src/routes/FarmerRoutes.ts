import express from "express";
import { FarmerController } from "../controllers/farmerController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateFarmerMiddlewareV2 } from "../validations/FarmerValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of FarmerController to handle route logic
const farmerController = new FarmerController();

/**
 * @swagger
 * tags:
 *   name: Farmer
 *   description: Farmer endpoints
 */

/**
 * @swagger
 * /api/farmers:
 *   post:
 *     summary: Create a new farmer
 *     tags: [Farmer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Farmer'
 *     responses:
 *       201:
 *         description: Farmer created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all farmers
 *     tags: [Farmer]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of farmers
 */

/**
 * @swagger
 * /api/farmers/{id}:
 *   get:
 *     summary: Get farmer by ID
 *     tags: [Farmer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Farmer details
 *       404:
 *         description: Farmer not found
 *   put:
 *     summary: Update farmer
 *     tags: [Farmer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FullName:
 *                 type: string
 *               Email:
 *                 type: string
 *               Bio:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *               Address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Farmer updated successfully
 *       404:
 *         description: Farmer not found
 *   delete:
 *     summary: Delete farmer
 *     tags: [Farmer]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Farmer deleted successfully
 *       404:
 *         description: Farmer not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Farmer:
 *       type: object
 *       properties:
 *         FarmerID:
 *           type: integer
 *         FullName:
 *           type: string
 *         Email:
 *           type: string
 *         PasswordHash:
 *           type: string
 *         ProfilePicture:
 *           type: string
 *           nullable: true
 *         CoverPhoto:
 *           type: string
 *           nullable: true
 *         Bio:
 *           type: string
 *           nullable: true
 *         Role:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         Status:
 *           type: string
 *         PhoneNumber:
 *           type: string
 *           nullable: true
 *         Address:
 *           type: string
 *           nullable: true
 *         LastLogin:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         AccountType:
 *           type: string
 */

/** Apply versioning to farmer routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/farmers`, authMiddleware, createBaseRoutes(farmerController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/farmers`, authMiddleware, validateFarmerMiddlewareV2, (req, res) => farmerController.create(req, res));
router.put(`/api/${apiVersionV2}/farmers/:id`, authMiddleware, validateFarmerMiddlewareV2, (req, res) => farmerController.update(req, res));
router.delete(`/api/${apiVersionV2}/farmers/:id`, authMiddleware, (req, res) => farmerController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/farmers`, authMiddleware, (req, res) => farmerController.read(req, res));
router.get(`/api/${apiVersionV2}/farmers/:id`, authMiddleware, (req, res) => farmerController.readById(req, res));

// Export the router for use in main application
export default router;
