import express from "express";
import { PostTagController } from "../controllers/postTagController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validatePostTagMiddlewareV2 } from "../validations/PostTagValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of PostTagController to handle route logic
const postTagController = new PostTagController();

/**
 * @swagger
 * tags:
 *   name: PostTag
 *   description: PostTag endpoints
 */

/**
 * @swagger
 * /api/posttag:
 *   post:
 *     summary: Create a new post tag
 *     tags: [PostTag]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostTag'
 *     responses:
 *       201:
 *         description: Post tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostTagResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Post tag already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post tag already exists
 *   get:
 *     summary: Get all post tags
 *     tags: [PostTag]
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
 *         description: List of post tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostTagResponse'
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
 * /api/posttag/{id}:
 *   get:
 *     summary: Get post tag by ID
 *     tags: [PostTag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post tag ID
 *     responses:
 *       200:
 *         description: Post tag details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostTagResponse'
 *       404:
 *         description: Post tag not found
 *   put:
 *     summary: Update post tag
 *     tags: [PostTag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: number
 *     responses:
 *       200:
 *         description: Post tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostTagResponse'
 *       404:
 *         description: Post tag not found
 *   delete:
 *     summary: Delete post tag
 *     tags: [PostTag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post tag ID
 *     responses:
 *       204:
 *         description: Post tag deleted successfully
 *       404:
 *         description: Post tag not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostTag:
 *       type: object
 *       properties:
 *         TagID:
 *           type: integer
 *           example: 10123
 *         PostID:
 *           type: integer
 *           example: 20234
 *         UserID:
 *           type: integer
 *           example: 30156
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *     PostTagResponse:
 *       type: object
 *       properties:
 *         TagID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to postTag routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/posttags`, authMiddleware, createBaseRoutes(postTagController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/posttags`, authMiddleware, validatePostTagMiddlewareV2, (req, res) => postTagController.create(req, res));
router.put(`/api/${apiVersionV2}/posttags/:id`, authMiddleware, validatePostTagMiddlewareV2, (req, res) => postTagController.update(req, res));
router.delete(`/api/${apiVersionV2}/posttags/:id`, authMiddleware, (req, res) => postTagController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/posttags`, authMiddleware, (req, res) => postTagController.read(req, res));
router.get(`/api/${apiVersionV2}/posttags/:id`, authMiddleware, (req, res) => postTagController.readById(req, res));

// Export the router for use in main application
export default router;
