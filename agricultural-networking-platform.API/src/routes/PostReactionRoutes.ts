import express from "express";
import { PostReactionController } from "../controllers/postReactionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validatePostReactionMiddlewareV2 } from "../validations/PostReactionValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of PostReactionController to handle route logic
const postReactionController = new PostReactionController();

/**
 * @swagger
 * tags:
 *   name: PostReaction
 *   description: PostReaction endpoints
 */

/**
 * @swagger
 * /api/postreaction:
 *   post:
 *     summary: Create a new post reaction
 *     tags: [PostReaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostReaction'
 *     responses:
 *       201:
 *         description: Post reaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReactionResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Post reaction already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post reaction already exists
 *   get:
 *     summary: Get all post reactions
 *     tags: [PostReaction]
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
 *         description: List of post reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostReactionResponse'
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
 * /api/postreaction/{id}:
 *   get:
 *     summary: Get post reaction by ID
 *     tags: [PostReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post reaction ID
 *     responses:
 *       200:
 *         description: Post reaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReactionResponse'
 *       404:
 *         description: Post reaction not found
 *   put:
 *     summary: Update post reaction
 *     tags: [PostReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post reaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ReactionType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post reaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReactionResponse'
 *       404:
 *         description: Post reaction not found
 *   delete:
 *     summary: Delete post reaction
 *     tags: [PostReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post reaction ID
 *     responses:
 *       204:
 *         description: Post reaction deleted successfully
 *       404:
 *         description: Post reaction not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostReaction:
 *       type: object
 *       properties:
 *         ReactionID:
 *           type: integer
 *           example: 10123
 *         UserID:
 *           type: integer
 *           example: 20234
 *         PostID:
 *           type: integer
 *           example: 30156
 *         ReactionType:
 *           type: string
 *           example: "like"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *     PostReactionResponse:
 *       type: object
 *       properties:
 *         ReactionID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         ReactionType:
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

//** Apply versioning to post reaction routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/postreactions`, authMiddleware, createBaseRoutes(postReactionController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/postreactions`, authMiddleware, validatePostReactionMiddlewareV2, (req, res) => postReactionController.create(req, res));
router.put(`/api/${apiVersionV2}/postreactions/:id`, authMiddleware, validatePostReactionMiddlewareV2, (req, res) => postReactionController.update(req, res));
router.delete(`/api/${apiVersionV2}/postreactions/:id`, authMiddleware, (req, res) => postReactionController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/postreactions`, authMiddleware, (req, res) => postReactionController.read(req, res));
router.get(`/api/${apiVersionV2}/postreactions/:id`, authMiddleware, (req, res) => postReactionController.readById(req, res));

// Export the router for use in main application
export default router;