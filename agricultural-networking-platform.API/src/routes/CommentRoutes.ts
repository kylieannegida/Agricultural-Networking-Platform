import express from "express";
import { CommentController } from "../controllers/commentController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateCommentMiddlewareV2 } from "../validations/CommentValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of CommentController to handle route logic
const commentController = new CommentController();

/**
 * @swagger
 * tags:
 *   name: Comment
 *   description: Comment endpoints
 */

/**
 * @swagger
 * /api/comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Comment already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment already exists
 *   get:
 *     summary: Get all comments
 *     tags: [Comment]
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
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommentResponse'
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
 * /api/comment/{id}:
 *   get:
 *     summary: Get comment by ID
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       200:
 *         description: Comment details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       404:
 *         description: Comment not found
 *   put:
 *     summary: Update comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Content:
 *                 type: string
 *               Status:
 *                 type: string
 *               MediaURL:
 *                 type: string
 *               Mentions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentResponse'
 *       404:
 *         description: Comment not found
 *   delete:
 *     summary: Delete comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment ID
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         CommentID:
 *           type: integer
 *           example: 10123
 *         UserID:
 *           type: integer
 *           example: 20234
 *         PostID:
 *           type: integer
 *           example: 30156
 *         Content:
 *           type: string
 *           example: "This is a great post!"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *         ParentCommentID:
 *           type: integer
 *           example: 40123
 *         Mentions:
 *           type: array
 *           items:
 *             type: string
 *           example: ["user1", "user2"]
 *         MediaURL:
 *           type: string
 *           example: "https://example.com/media.jpg"
 *         Status:
 *           type: string
 *           example: "Active"
 *     CommentResponse:
 *       type: object
 *       properties:
 *         CommentID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         Content:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         ParentCommentID:
 *           type: integer
 *         Mentions:
 *           type: array
 *           items:
 *             type: string
 *         MediaURL:
 *           type: string
 *         Status:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to comment routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/comment`, authMiddleware, createBaseRoutes(commentController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/comment`, authMiddleware, validateCommentMiddlewareV2, (req, res) => commentController.create(req, res));
router.put(`/api/${apiVersionV2}/comment/:id`, authMiddleware, validateCommentMiddlewareV2, (req, res) => commentController.update(req, res));
router.delete(`/api/${apiVersionV2}/comment/:id`, authMiddleware, (req, res) => commentController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/comment`, authMiddleware, (req, res) => commentController.read(req, res));
router.get(`/api/${apiVersionV2}/comment/:id`, authMiddleware, (req, res) => commentController.readById(req, res));

// Export the router for use in main application
export default router;
