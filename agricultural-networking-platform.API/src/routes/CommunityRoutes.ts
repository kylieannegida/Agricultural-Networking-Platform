import express from "express";
import { CommunityController } from "../controllers/communityController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommunityMiddlewareV2 } from "../validations/CommunityValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityController to handle route logic
const communityController = new CommunityController();

/**
 * @swagger
 * tags:
 *   name: Community
 *   description: Community endpoints
 */

/**
 * @swagger
 * /api/community:
 *   post:
 *     summary: Create a new community
 *     tags: [Community]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Community'
 *     responses:
 *       201:
 *         description: Community created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Community already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Community already exists
 *   get:
 *     summary: Get all communities
 *     tags: [Community]
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
 *         description: List of communities
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommunityResponse'
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
 * /api/community/{id}:
 *   get:
 *     summary: Get community by ID
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     responses:
 *       200:
 *         description: Community details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityResponse'
 *       404:
 *         description: Community not found
 *   put:
 *     summary: Update community
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
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
 *               Type:
 *                 type: string
 *               PrivacyLevel:
 *                 type: string
 *               JoinRequestApprovalRequired:
 *                 type: boolean
 *               CoverPhoto:
 *                 type: string
 *               Rules:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Community updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommunityResponse'
 *       404:
 *         description: Community not found
 *   delete:
 *     summary: Delete community
 *     tags: [Community]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Community ID
 *     responses:
 *       204:
 *         description: Community deleted successfully
 *       404:
 *         description: Community not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Community:
 *       type: object
 *       properties:
 *         CommunityID:
 *           type: integer
 *           example: 10123
 *         Name:
 *           type: string
 *           example: "Tech Enthusiasts"
 *         Description:
 *           type: string
 *           example: "A community for tech lovers"
 *         Type:
 *           type: string
 *           example: "Public"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *         AdminUserID:
 *           type: integer
 *           example: 20234
 *         MembersCount:
 *           type: integer
 *           example: 100
 *         PrivacyLevel:
 *           type: string
 *           example: "Public"
 *         JoinRequestApprovalRequired:
 *           type: boolean
 *           example: true
 *         CoverPhoto:
 *           type: string
 *           example: "https://example.com/cover.jpg"
 *         Rules:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Be respectful", "No spam"]
 *     CommunityResponse:
 *       type: object
 *       properties:
 *         CommunityID:
 *           type: integer
 *         Name:
 *           type: string
 *         Description:
 *           type: string
 *         Type:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         AdminUserID:
 *           type: integer
 *         MembersCount:
 *           type: integer
 *         PrivacyLevel:
 *           type: string
 *         JoinRequestApprovalRequired:
 *           type: boolean
 *         CoverPhoto:
 *           type: string
 *         Rules:
 *           type: array
 *           items:
 *             type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to community routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/community`, authMiddleware, createBaseRoutes(communityController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/community`, authMiddleware, validateCommunityMiddlewareV2, (req, res) => communityController.create(req, res));
router.put(`/api/${apiVersionV2}/community/:id`, authMiddleware, validateCommunityMiddlewareV2, (req, res) => communityController.update(req, res));
router.delete(`/api/${apiVersionV2}/community/:id`, authMiddleware, (req, res) => communityController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/community`, authMiddleware, (req, res) => communityController.read(req, res));
router.get(`/api/${apiVersionV2}/community/:id`, authMiddleware, (req, res) => communityController.readById(req, res));

// Export the router for use in main application
export default router;
