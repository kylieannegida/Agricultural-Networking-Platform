import express from "express";
import { CommunityPostController } from "../controllers/communityPostController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommunityPostMiddlewareV2 } from "../validations/CommunityPostValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityPostController to handle route logic
const communityPostController = new CommunityPostController();

/**
 * @swagger
 * tags:
 *   name: CommunityPost
 *   description: Community Post endpoints
 */

/**
 * @swagger
 * /api/community-posts:
 *   post:
 *     summary: Create a new community post
 *     tags: [CommunityPost]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityPost'
 *     responses:
 *       201:
 *         description: Community post created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all community posts
 *     tags: [CommunityPost]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of community posts
 */

/**
 * @swagger
 * /api/community-posts/{id}:
 *   get:
 *     summary: Get community post by ID
 *     tags: [CommunityPost]
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
 *         description: Community post details
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete community post
 *     tags: [CommunityPost]
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
 *         description: Community post deleted successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityPost:
 *       type: object
 *       properties:
 *         CommunityPostID:
 *           type: integer
 *         CommunityID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         ApprovedByAdmin:
 *           type: integer
 *           nullable: true
 */

/** Apply versioning to community post routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/community-posts`, authMiddleware, createBaseRoutes(communityPostController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/community-posts`, authMiddleware, validateCommunityPostMiddlewareV2, (req, res) => communityPostController.create(req, res));
router.put(`/api/${apiVersionV2}/community-posts/:id`, authMiddleware, validateCommunityPostMiddlewareV2, (req, res) => communityPostController.update(req, res));
router.delete(`/api/${apiVersionV2}/community-posts/:id`, authMiddleware, (req, res) => communityPostController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/community-posts`, authMiddleware, (req, res) => communityPostController.read(req, res));
router.get(`/api/${apiVersionV2}/community-posts/:id`, authMiddleware, (req, res) => communityPostController.readById(req, res));

// Export the router for use in main application
export default router;
