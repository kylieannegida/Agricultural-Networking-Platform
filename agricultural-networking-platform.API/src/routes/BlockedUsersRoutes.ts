import express from "express";
import { BlockedUsersController } from "../controllers/blockedUsersController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "../routes/BaseRoutes";
import { validateBlockedUsersMiddlewareV2 } from "../validations/BlockedUsersValidation";

// Initialize express Router
const router = express.Router();

// Create instance of BlockedUsersController to handle route logic
const blockedUsersController = new BlockedUsersController();

/**
 * @swagger
 * tags:
 *   name: BlockedUsers
 *   description: Blocked Users endpoints
 */

/**
 * @swagger
 * /api/blocked-users:
 *   post:
 *     summary: Block a user
 *     tags: [BlockedUsers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BlockedUser'
 *     responses:
 *       201:
 *         description: User blocked successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Conflict error (e.g., User already blocked)
 *   get:
 *     summary: Get all blocked users
 *     tags: [BlockedUsers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of blocked users
 */

/**
 * @swagger
 * /api/blocked-users/{id}:
 *   get:
 *     summary: Get blocked user by ID
 *     tags: [BlockedUsers]
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
 *         description: Blocked user details
 *       404:
 *         description: Blocked user not found
 *   delete:
 *     summary: Unblock a user
 *     tags: [BlockedUsers]
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
 *         description: User unblocked successfully
 *       404:
 *         description: Blocked user not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlockedUser:
 *       type: object
 *       properties:
 *         BlockID:
 *           type: integer
 *         UserID:
 *           type: integer
 *         BlockedUserID:
 *           type: integer
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         Reason:
 *           type: string
 */
/** Apply versioning to blocked users routes
 */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/blocked-users`, authMiddleware, createBaseRoutes(blockedUsersController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/blocked-users`, authMiddleware, validateBlockedUsersMiddlewareV2, (req, res) => blockedUsersController.create(req, res));
router.put(`/api/${apiVersionV2}/blocked-users/:id`, authMiddleware, validateBlockedUsersMiddlewareV2, (req, res) => blockedUsersController.update(req, res));
router.delete(`/api/${apiVersionV2}/blocked-users/:id`, authMiddleware, (req, res) => blockedUsersController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/blocked-users`, authMiddleware, (req, res) => blockedUsersController.read(req, res));
router.get(`/api/${apiVersionV2}/blocked-users/:id`, authMiddleware, (req, res) => blockedUsersController.readById(req, res));

// Export the router for use in main application
export default router;
