import express from "express";
import { FriendshipController } from "../controllers/friendshipController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateFriendshipMiddlewareV2 } from "../validations/FriendshipValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of FriendshipController to handle route logic
const friendshipController = new FriendshipController();

/**
 * @swagger
 * tags:
 *   name: Friendship
 *   description: Friendship endpoints
 */

/**
 * @swagger
 * /api/friendships:
 *   post:
 *     summary: Create a new friendship
 *     tags: [Friendship]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Friendship'
 *     responses:
 *       201:
 *         description: Friendship created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all friendships
 *     tags: [Friendship]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of friendships
 */

/**
 * @swagger
 * /api/friendships/{id}:
 *   get:
 *     summary: Get friendship by ID
 *     tags: [Friendship]
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
 *         description: Friendship details
 *       404:
 *         description: Friendship not found
 *   put:
 *     summary: Update friendship
 *     tags: [Friendship]
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
 *               Status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friendship updated successfully
 *       404:
 *         description: Friendship not found
 *   delete:
 *     summary: Delete friendship
 *     tags: [Friendship]
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
 *         description: Friendship deleted successfully
 *       404:
 *         description: Friendship not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Friendship:
 *       type: object
 *       properties:
 *         FriendshipID:
 *           type: integer
 *         UserID1:
 *           type: integer
 *         UserID2:
 *           type: integer
 *         Status:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         UpdatedAt:
 *           type: string
 *           format: date-time
 */

/** Apply versioning to friendship routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/friendships`, authMiddleware, createBaseRoutes(friendshipController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/friendships`, authMiddleware, validateFriendshipMiddlewareV2, (req, res) => friendshipController.create(req, res));
router.put(`/api/${apiVersionV2}/friendships/:id`, authMiddleware, validateFriendshipMiddlewareV2, (req, res) => friendshipController.update(req, res));
router.delete(`/api/${apiVersionV2}/friendships/:id`, authMiddleware, (req, res) => friendshipController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/friendships`, authMiddleware, (req, res) => friendshipController.read(req, res));
router.get(`/api/${apiVersionV2}/friendships/:id`, authMiddleware, (req, res) => friendshipController.readById(req, res));

// Export the router for use in main application
export default router;
