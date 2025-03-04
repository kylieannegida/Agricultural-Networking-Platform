import express from "express";
import { CommentReactionController } from "../controllers/commentReactionController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./BaseRoutes";
import { validateCommentReactionMiddlewareV2 } from "../validations/CommentReactionValidation";

// Initialize express Router
const router = express.Router();

// Create instance of CommentReactionController to handle route logic
const commentReactionController = new CommentReactionController();

/**
 * @swagger
 * tags:
 *   name: CommentReaction
 *   description: CommentReaction endpoints
 */

/**
 * @swagger
 * /api/commentreaction:
 *   post:
 *     summary: Create a new comment reaction
 *     tags: [CommentReaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentReaction'
 *     responses:
 *       201:
 *         description: Comment reaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReactionResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Comment reaction already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment reaction already exists
 *   get:
 *     summary: Get all comment reactions
 *     tags: [CommentReaction]
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
 *         description: List of comment reactions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommentReactionResponse'
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
 * /api/commentreaction/{id}:
 *   get:
 *     summary: Get comment reaction by ID
 *     tags: [CommentReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment reaction ID
 *     responses:
 *       200:
 *         description: Comment reaction details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReactionResponse'
 *       404:
 *         description: Comment reaction not found
 *   put:
 *     summary: Update comment reaction
 *     tags: [CommentReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment reaction ID
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
 *         description: Comment reaction updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReactionResponse'
 *       404:
 *         description: Comment reaction not found
 *   delete:
 *     summary: Delete comment reaction
 *     tags: [CommentReaction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment reaction ID
 *     responses:
 *       204:
 *         description: Comment reaction deleted successfully
 *       404:
 *         description: Comment reaction not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentReaction:
 *       type: object
 *       properties:
 *         ReactionID:
 *           type: integer
 *           example: 10123
 *         UserID:
 *           type: integer
 *           example: 20234
 *         CommentID:
 *           type: integer
 *           example: 30156
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         ReactionType:
 *           type: string
 *           example: "Like"
 *     CommentReactionResponse:
 *       type: object
 *       properties:
 *         ReactionID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         CommentID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         ReactionType:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to comment reaction routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/commentreaction`, authMiddleware, createBaseRoutes(commentReactionController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/commentreaction`, authMiddleware, validateCommentReactionMiddlewareV2, (req, res) => commentReactionController.create(req, res));
router.put(`/api/${apiVersionV2}/commentreaction/:id`, authMiddleware, validateCommentReactionMiddlewareV2, (req, res) => commentReactionController.update(req, res));
router.delete(`/api/${apiVersionV2}/commentreaction/:id`, authMiddleware, (req, res) => commentReactionController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/commentreaction`, authMiddleware, (req, res) => commentReactionController.read(req, res));
router.get(`/api/${apiVersionV2}/commentreaction/:id`, authMiddleware, (req, res) => commentReactionController.readById(req, res));

// Export the router for use in main application
export default router;
