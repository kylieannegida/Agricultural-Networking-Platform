import express from "express";
import { CommunityMemberController } from "../controllers/communityMemberController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommunityMemberMiddlewareV2 } from "../validations/CommunityMemberValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityMemberController to handle route logic
const communityMemberController = new CommunityMemberController();

/**
 * @swagger
 * tags:
 *   name: CommunityMember
 *   description: Community Member endpoints
 */

/**
 * @swagger
 * /api/community-members:
 *   post:
 *     summary: Create a new community member
 *     tags: [CommunityMember]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityMember'
 *     responses:
 *       201:
 *         description: Community member created successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Conflict error (e.g., Member already exists)
 *   get:
 *     summary: Get all community members
 *     tags: [CommunityMember]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of community members
 */

/**
 * @swagger
 * /api/community-members/{id}:
 *   get:
 *     summary: Get community member by ID
 *     tags: [CommunityMember]
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
 *         description: Community member details
 *       404:
 *         description: Member not found
 *   put:
 *     summary: Update community member
 *     tags: [CommunityMember]
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
 *               Role:
 *                 type: string
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Community member updated successfully
 *       404:
 *         description: Member not found
 *   delete:
 *     summary: Delete community member
 *     tags: [CommunityMember]
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
 *         description: Community member deleted successfully
 *       404:
 *         description: Member not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityMember:
 *       type: object
 *       properties:
 *         MemberID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         CommunityID:
 *           type: integer
 *         Role:
 *           type: string
 *         JoinedAt:
 *           type: string
 *           format: date-time
 *         ApprovedBy:
 *           type: integer
 *           nullable: true
 *         Status:
 *           type: string
 *         BannedUntil:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         MuteUntil:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         JoinRequestMessage:
 *           type: string
 *           nullable: true
 */

/** Apply versioning to community member routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/community-members`, authMiddleware, createBaseRoutes(communityMemberController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/community-members`, authMiddleware, validateCommunityMemberMiddlewareV2, (req, res) => communityMemberController.create(req, res));
router.put(`/api/${apiVersionV2}/community-members/:id`, authMiddleware, validateCommunityMemberMiddlewareV2, (req, res) => communityMemberController.update(req, res));
router.delete(`/api/${apiVersionV2}/community-members/:id`, authMiddleware, (req, res) => communityMemberController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/community-members`, authMiddleware, (req, res) => communityMemberController.read(req, res));
router.get(`/api/${apiVersionV2}/community-members/:id`, authMiddleware, (req, res) => communityMemberController.readById(req, res));

// Export the router for use in main application
export default router;