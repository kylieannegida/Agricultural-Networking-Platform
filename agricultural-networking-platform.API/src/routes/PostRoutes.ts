import express from "express";
import { PostController } from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validatePostMiddlewareV2 } from "../validations/PostValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of PostController to handle route logic
const postController = new PostController();

/**
 * @swagger
 * tags:
 *   name: Post
 *   description: Post endpoints
 */

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of posts
 */

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Post]
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
 *         description: Post details
 *       404:
 *         description: Post not found
 *   put:
 *     summary: Update post
 *     tags: [Post]
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
 *               Content:
 *                 type: string
 *               MediaURL:
 *                 type: string
 *               Privacy:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *   delete:
 *     summary: Delete post
 *     tags: [Post]
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
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         PostID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         Content:
 *           type: string
 *         MediaURL:
 *           type: string
 *         Privacy:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 *         SharedFromPostID:
 *           type: integer
 *         Location:
 *           type: string
 *         Tags:
 *           type: array
 *           items:
 *             type: string
 *         ReactionCount:
 *           type: integer
 *         CommentCount:
 *           type: integer
 *         ShareCount:
 *           type: integer
 *         PostType:
 *           type: string
 *         EditedAt:
 *           type: string
 *           format: date-time
 *         VisibilitySettings:
 *           type: string
 */

/** Apply versioning to post routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/posts`, authMiddleware, createBaseRoutes(postController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/posts`, authMiddleware, validatePostMiddlewareV2, (req, res) => postController.create(req, res));
router.put(`/api/${apiVersionV2}/posts/:id`, authMiddleware, validatePostMiddlewareV2, (req, res) => postController.update(req, res));
router.delete(`/api/${apiVersionV2}/posts/:id`, authMiddleware, (req, res) => postController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/posts`, authMiddleware, (req, res) => postController.read(req, res));
router.get(`/api/${apiVersionV2}/posts/:id`, authMiddleware, (req, res) => postController.readById(req, res));

// Export the router for use in main application
export default router;
