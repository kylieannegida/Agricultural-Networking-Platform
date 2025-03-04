import express from "express";
import { UserSettingsController } from "../controllers/userSettingsController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateUserSettingsMiddlewareV2 } from "../validations/UserSettingsValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of UserSettingsController to handle route logic
const userSettingsController = new UserSettingsController();

/**
 * @swagger
 * tags:
 *   name: UserSettings
 *   description: UserSettings endpoints
 */

/**
 * @swagger
 * /api/usersettings:
 *   post:
 *     summary: Create new user settings
 *     tags: [UserSettings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSettings'
 *     responses:
 *       201:
 *         description: User settings created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettingsResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., User settings already exist)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User settings already exist
 *   get:
 *     summary: Get all user settings
 *     tags: [UserSettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of user settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserSettingsResponse'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */

/**
 * @swagger
 * /api/usersettings/{id}:
 *   get:
 *     summary: Get user settings by ID
 *     tags: [UserSettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User settings ID
 *     responses:
 *       200:
 *         description: User settings details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettingsResponse'
 *       404:
 *         description: User settings not found
 *   put:
 *     summary: Update user settings
 *     tags: [UserSettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User settings ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PrivacySettings:
 *                 type: string
 *               NotificationSettings:
 *                 type: string
 *               LanguagePreference:
 *                 type: string
 *               Theme:
 *                 type: string
 *     responses:
 *       200:
 *         description: User settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSettingsResponse'
 *       404:
 *         description: User settings not found
 *   delete:
 *     summary: Delete user settings
 *     tags: [UserSettings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User settings ID
 *     responses:
 *       204:
 *         description: User settings deleted successfully
 *       404:
 *         description: User settings not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserSettings:
 *       type: object
 *       properties:
 *         SettingsID:
 *           type: integer
 *           example: 10123
 *         UserID:
 *           type: integer
 *           example: 20234
 *         PrivacySettings:
 *           type: string
 *           example: "Private"
 *         NotificationSettings:
 *           type: string
 *           example: "Enabled"
 *         LanguagePreference:
 *           type: string
 *           example: "English"
 *         Theme:
 *           type: string
 *           example: "Dark"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *     UserSettingsResponse:
 *       type: object
 *       properties:
 *         SettingsID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         PrivacySettings:
 *           type: string
 *         NotificationSettings:
 *           type: string
 *         LanguagePreference:
 *           type: string
 *         Theme:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to user settings routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/usersettings`, authMiddleware, createBaseRoutes(userSettingsController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/usersettings`, authMiddleware, validateUserSettingsMiddlewareV2, (req, res) => userSettingsController.create(req, res));
router.put(`/api/${apiVersionV2}/usersettings/:id`, authMiddleware, validateUserSettingsMiddlewareV2, (req, res) => userSettingsController.update(req, res));
router.delete(`/api/${apiVersionV2}/usersettings/:id`, authMiddleware, (req, res) => userSettingsController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/usersettings`, authMiddleware, (req, res) => userSettingsController.read(req, res));
router.get(`/api/${apiVersionV2}/usersettings/:id`, authMiddleware, (req, res) => userSettingsController.readById(req, res));

// Export the router for use in main application
export default router;
