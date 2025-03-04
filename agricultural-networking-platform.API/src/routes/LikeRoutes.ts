import express from "express";
import { LikeController } from "../controllers/likeController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateLikeMiddlewareV2 } from "../validations/LikeValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of LikeController to handle route logic
const likeController = new LikeController();

/**
 * @swagger
 * tags:
 *   name: Like
 *   description: Like endpoints
 */

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Create a new like
 *     tags: [Like]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       201:
 *         description: Like created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all likes
 *     tags: [Like]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of likes
 */

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     summary: Get like by ID
 *     tags: [Like]
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
 *         description: Like details
 *       404:
 *         description: Like not found
 *   delete:
 *     summary: Delete like
 *     tags: [Like]
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
 *         description: Like deleted successfully
 *       404:
 *         description: Like not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         LikeID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         ReactionType:
 *           type: string
 */

/** Apply versioning to like routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/likes`, authMiddleware, createBaseRoutes(likeController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/likes`, authMiddleware, validateLikeMiddlewareV2, (req, res) => likeController.create(req, res));
router.put(`/api/${apiVersionV2}/likes/:id`, authMiddleware, validateLikeMiddlewareV2, (req, res) => likeController.update(req, res));
router.delete(`/api/${apiVersionV2}/likes/:id`, authMiddleware, (req, res) => likeController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/likes`, authMiddleware, (req, res) => likeController.read(req, res));
router.get(`/api/${apiVersionV2}/likes/:id`, authMiddleware, (req, res) => likeController.readById(req, res));

// Export the router for use in main application
export default router;