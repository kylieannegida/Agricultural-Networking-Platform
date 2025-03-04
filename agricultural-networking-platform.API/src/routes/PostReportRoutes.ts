import express from "express";
import { PostReportController } from "../controllers/postReportController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validatePostReportMiddlewareV2 } from "../validations/PostReportValidation";
import { createBaseRoutes } from "./BaseRoutes";

// Initialize express Router
const router = express.Router();

// Create instance of PostReportController to handle route logic
const postReportController = new PostReportController();

/**
 * @swagger
 * tags:
 *   name: PostReport
 *   description: PostReport endpoints
 */

/**
 * @swagger
 * /api/postreport:
 *   post:
 *     summary: Create a new post report
 *     tags: [PostReport]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PostReport'
 *     responses:
 *       201:
 *         description: Post report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReportResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Post report already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post report already exists
 *   get:
 *     summary: Get all post reports
 *     tags: [PostReport]
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
 *         description: List of post reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PostReportResponse'
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
 * /api/postreport/{id}:
 *   get:
 *     summary: Get post report by ID
 *     tags: [PostReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post report ID
 *     responses:
 *       200:
 *         description: Post report details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReportResponse'
 *       404:
 *         description: Post report not found
 *   put:
 *     summary: Update post report
 *     tags: [PostReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post report ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Status:
 *                 type: string
 *               ReviewedByAdmin:
 *                 type: number
 *               ReviewedAt:
 *                 type: string
 *                 format: date-time
 *               ActionTaken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PostReportResponse'
 *       404:
 *         description: Post report not found
 *   delete:
 *     summary: Delete post report
 *     tags: [PostReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post report ID
 *     responses:
 *       204:
 *         description: Post report deleted successfully
 *       404:
 *         description: Post report not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PostReport:
 *       type: object
 *       properties:
 *         ReportID:
 *           type: integer
 *           example: 10123
 *         PostID:
 *           type: integer
 *           example: 20234
 *         ReportedByUserID:
 *           type: integer
 *           example: 30156
 *         Reason:
 *           type: string
 *           example: "Inappropriate content"
 *         Status:
 *           type: string
 *           example: "Pending"
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-15T12:00:00Z"
 *         ReviewedByAdmin:
 *           type: number
 *           example: 40123
 *         ReviewedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-08-16T12:00:00Z"
 *         ActionTaken:
 *           type: string
 *           example: "Post removed"
 *     PostReportResponse:
 *       type: object
 *       properties:
 *         ReportID:
 *           type: integer
 *         PostID:
 *           type: integer
 *         ReportedByUserID:
 *           type: integer
 *         Reason:
 *           type: string
 *         Status:
 *           type: string
 *         CreatedAt:
 *           type: string
 *           format: date-time
 *         ReviewedByAdmin:
 *           type: number
 *         ReviewedAt:
 *           type: string
 *           format: date-time
 *         ActionTaken:
 *           type: string
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation failed for one or more fields"
 */

/** Apply versioning to post report routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/postreports`, authMiddleware, createBaseRoutes(postReportController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/postreports`, authMiddleware, validatePostReportMiddlewareV2, (req, res) => postReportController.create(req, res));
router.put(`/api/${apiVersionV2}/postreports/:id`, authMiddleware, validatePostReportMiddlewareV2, (req, res) => postReportController.update(req, res));
router.delete(`/api/${apiVersionV2}/postreports/:id`, authMiddleware, (req, res) => postReportController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/postreports`, authMiddleware, (req, res) => postReportController.read(req, res));
router.get(`/api/${apiVersionV2}/postreports/:id`, authMiddleware, (req, res) => postReportController.readById(req, res));

// Export the router for use in main application
export default router;