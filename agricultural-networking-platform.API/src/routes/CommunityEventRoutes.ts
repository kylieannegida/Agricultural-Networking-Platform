import express from "express";
import { CommunityEventController } from "../controllers/communityEventController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommunityEventMiddlewareV2 } from "../validations/CommunityEventValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityEventController to handle route logic
const communityEventController = new CommunityEventController();

/**
 * @swagger
 * tags:
 *   name: CommunityEvent
 *   description: CommunityEvent endpoints
 */

/**
 * @swagger
 * /api/communityevent:
 *   post:
 *     summary: Create a new community event
 *     tags: [CommunityEvent]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityEvent'
 *     responses:
 *       201:
 *         description: Community event created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Community event already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Community event already exists
 *   get:
 *     summary: Get all community events
 *     tags: [CommunityEvent]
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
 *         description: List of community events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommunityEventResponse'
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
 * /api/communityevent/{id}:
 *   get:
 *     summary: Get community event by ID
 *     tags: [CommunityEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event ID
 *     responses:
 *       200:
 *         description: Community event details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventResponse'
 *       404:
 *         description: Community event not found
 *   put:
 *     summary: Update community event
 *     tags: [CommunityEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *               Description:
 *                 type: string
 *               StartDate:
 *                 type: string
 *                 format: date-time
 *               EndDate:
 *                 type: string
 *                 format: date-time
 *               Location:
 *                 type: string
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Community event updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventResponse'
 *       404:
 *         description: Community event not found
 *   delete:
 *     summary: Delete community event
 *     tags: [CommunityEvent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event ID
 *     responses:
 *       204:
 *         description: Community event deleted successfully
 *       404:
 *         description: Community event not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityEvent:
 *       type: object
 *       properties:
 *         EventID:
 *           type: integer
 *           example: 10123
 *         CommunityID:
 *           type: integer
 *           example: 20234
 *         Name:
 *           type: string
 *           example: "Tech Conference 2024"
 *         Description:
 *           type: string
 *           example: "Annual tech conference for developers"
 *         StartDate:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         EndDate:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *         Location:
 *           type: string
 *           example: "San Francisco, CA"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *         OrganizerUserID:
 *           type: integer
 *           example: 30156
 *         Status:
 *           type: string
 *           example: "Active"
 *     CommunityEventResponse:
 *       type: object
 *       properties:
 *         EventID:
 *           type: integer
 *         CommunityID:
 *           type: integer
 *         Name:
 *           type: string
 *         Description:
 *           type: string
 *         StartDate:
 *           type: string
 *           format: date-time
 *         EndDate:
 *           type: string
 *           format: date-time
 *         Location:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         OrganizerUserID:
 *           type: integer
 *         Status:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

//** Apply versioning to community event routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/communityevent`, authMiddleware, createBaseRoutes(communityEventController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/communityevent`, authMiddleware, validateCommunityEventMiddlewareV2, (req, res) => communityEventController.create(req, res));
router.put(`/api/${apiVersionV2}/communityevent/:id`, authMiddleware, validateCommunityEventMiddlewareV2, (req, res) => communityEventController.update(req, res));
router.delete(`/api/${apiVersionV2}/communityevent/:id`, authMiddleware, (req, res) => communityEventController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/communityevent`, authMiddleware, (req, res) => communityEventController.read(req, res));
router.get(`/api/${apiVersionV2}/communityevent/:id`, authMiddleware, (req, res) => communityEventController.readById(req, res));

// Export the router for use in main application
export default router;