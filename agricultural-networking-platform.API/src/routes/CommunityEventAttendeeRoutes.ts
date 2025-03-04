import express from "express";
import { CommunityEventAttendeeController } from "../controllers/communityEventAttendeeController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommunityEventAttendeeMiddlewareV2 } from "../validations/CommunityEventAttendeeValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityEventAttendeeController to handle route logic
const communityEventAttendeeController = new CommunityEventAttendeeController();

/**
 * @swagger
 * tags:
 *   name: CommunityEventAttendee
 *   description: CommunityEventAttendee endpoints
 */

/**
 * @swagger
 * /api/communityeventattendee:
 *   post:
 *     summary: Create a new community event attendee
 *     tags: [CommunityEventAttendee]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityEventAttendee'
 *     responses:
 *       201:
 *         description: Community event attendee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventAttendeeResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Community event attendee already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Community event attendee already exists
 *   get:
 *     summary: Get all community event attendees
 *     tags: [CommunityEventAttendee]
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
 *         description: List of community event attendees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommunityEventAttendeeResponse'
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
 * /api/communityeventattendee/{id}:
 *   get:
 *     summary: Get community event attendee by ID
 *     tags: [CommunityEventAttendee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event attendee ID
 *     responses:
 *       200:
 *         description: Community event attendee details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventAttendeeResponse'
 *       404:
 *         description: Community event attendee not found
 *   put:
 *     summary: Update community event attendee
 *     tags: [CommunityEventAttendee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event attendee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RSVPStatus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Community event attendee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityEventAttendeeResponse'
 *       404:
 *         description: Community event attendee not found
 *   delete:
 *     summary: Delete community event attendee
 *     tags: [CommunityEventAttendee]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community event attendee ID
 *     responses:
 *       204:
 *         description: Community event attendee deleted successfully
 *       404:
 *         description: Community event attendee not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityEventAttendee:
 *       type: object
 *       properties:
 *         AttendeeID:
 *           type: integer
 *           example: 10123
 *         EventID:
 *           type: integer
 *           example: 20234
 *         UserID:
 *           type: integer
 *           example: 30156
 *         RSVPStatus:
 *           type: string
 *           example: "Attending"
 *         JoinedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *     CommunityEventAttendeeResponse:
 *       type: object
 *       properties:
 *         AttendeeID:
 *           type: integer
 *         EventID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         RSVPStatus:
 *           type: string
 *         JoinedAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

//** Apply versioning to community event attendee routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/communityeventattendee`, authMiddleware, createBaseRoutes(communityEventAttendeeController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/communityeventattendee`, authMiddleware, validateCommunityEventAttendeeMiddlewareV2, (req, res) => communityEventAttendeeController.create(req, res));
router.put(`/api/${apiVersionV2}/communityeventattendee/:id`, authMiddleware, validateCommunityEventAttendeeMiddlewareV2, (req, res) => communityEventAttendeeController.update(req, res));
router.delete(`/api/${apiVersionV2}/communityeventattendee/:id`, authMiddleware, (req, res) => communityEventAttendeeController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/communityeventattendee`, authMiddleware, (req, res) => communityEventAttendeeController.read(req, res));
router.get(`/api/${apiVersionV2}/communityeventattendee/:id`, authMiddleware, (req, res) => communityEventAttendeeController.readById(req, res));

// Export the router for use in main application
export default router;
