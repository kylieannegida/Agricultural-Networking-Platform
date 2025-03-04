import express from "express";
import { ShareController } from "../controllers/shareController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateShareMiddlewareV2 } from "../validations/ShareValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of ShareController to handle route logic
const shareController = new ShareController();

/**
 * @swagger
 * tags:
 *   name: Share
 *   description: Share endpoints
 */

/**
 * @swagger
 * /api/share:
 *   post:
 *     summary: Create a new share
 *     tags: [Share]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Share'
 *     responses:
 *       201:
 *         description: Share created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShareResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Share already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Share already exists
 *   get:
 *     summary: Get all shares
 *     tags: [Share]
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
 *         description: List of shares
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ShareResponse'
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
 * /api/share/{id}:
 *   get:
 *     summary: Get share by ID
 *     tags: [Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Share ID
 *     responses:
 *       200:
 *         description: Share details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShareResponse'
 *       404:
 *         description: Share not found
 *   put:
 *     summary: Update share
 *     tags: [Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Share ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               SharedMessage:
 *                 type: string
 *               VisibilitySettings:
 *                 type: string
 *     responses:
 *       200:
 *         description: Share updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShareResponse'
 *       404:
 *         description: Share not found
 *   delete:
 *     summary: Delete share
 *     tags: [Share]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Share ID
 *     responses:
 *       204:
 *         description: Share deleted successfully
 *       404:
 *         description: Share not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Share:
 *       type: object
 *       properties:
 *         ShareID:
 *           type: integer
 *           example: 10123
 *         UserID:
 *           type: integer
 *           example: 20234
 *         PostID:
 *           type: integer
 *           example: 30156
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         SharedMessage:
 *           type: string
 *           example: "Check this out!"
 *         VisibilitySettings:
 *           type: string
 *           example: "Public"
 *     ShareResponse:
 *       type: object
 *       properties:
 *         ShareID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         SharedMessage:
 *           type: string
 *         VisibilitySettings:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to share routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/shares`, authMiddleware, createBaseRoutes(shareController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/shares`, authMiddleware, validateShareMiddlewareV2, (req, res) => shareController.create(req, res));
router.put(`/api/${apiVersionV2}/shares/:id`, authMiddleware, validateShareMiddlewareV2, (req, res) => shareController.update(req, res));
router.delete(`/api/${apiVersionV2}/shares/:id`, authMiddleware, (req, res) => shareController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/shares`, authMiddleware, (req, res) => shareController.read(req, res));
router.get(`/api/${apiVersionV2}/shares/:id`, authMiddleware, (req, res) => shareController.readById(req, res));

// Export the router for use in main application
export default router;