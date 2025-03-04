import express from "express";
import { CommentReportController } from "../controllers/commentReportController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./BaseRoutes";
import { validateCommentReportMiddlewareV2 } from "../validations/CommentReportValidation";

// Initialize express Router
const router = express.Router();

// Create instance of CommentReportController to handle route logic
const commentReportController = new CommentReportController();

/**
 * @swagger
 * tags:
 *   name: CommentReport
 *   description: CommentReport endpoints
 */

/**
 * @swagger
 * /api/commentreport:
 *   post:
 *     summary: Create a new comment report
 *     tags: [CommentReport]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommentReport'
 *     responses:
 *       201:
 *         description: Comment report created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReportResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       409:
 *         description: Conflict error (e.g., Comment report already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Comment report already exists
 *   get:
 *     summary: Get all comment reports
 *     tags: [CommentReport]
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
 *         description: List of comment reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CommentReportResponse'
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
 * /api/commentreport/{id}:
 *   get:
 *     summary: Get comment report by ID
 *     tags: [CommentReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment report ID
 *     responses:
 *       200:
 *         description: Comment report details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReportResponse'
 *       404:
 *         description: Comment report not found
 *   put:
 *     summary: Update comment report
 *     tags: [CommentReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment report ID
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
 *         description: Comment report updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CommentReportResponse'
 *       404:
 *         description: Comment report not found
 *   delete:
 *     summary: Delete comment report
 *     tags: [CommentReport]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment report ID
 *     responses:
 *       204:
 *         description: Comment report deleted successfully
 *       404:
 *         description: Comment report not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommentReport:
 *       type: object
 *       properties:
 *         ReportID:
 *           type: integer
 *           example: 10123
 *         CommentID:
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
 *           example: "Comment removed"
 *     CommentReportResponse:
 *       type: object
 *       properties:
 *         ReportID:
 *           type: integer
 *         CommentID:
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

/** Apply versioning to comment report routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/commentreport`, authMiddleware, createBaseRoutes(commentReportController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/commentreport`, authMiddleware, validateCommentReportMiddlewareV2, (req, res) => commentReportController.create(req, res));
router.put(`/api/${apiVersionV2}/commentreport/:id`, authMiddleware, validateCommentReportMiddlewareV2, (req, res) => commentReportController.update(req, res));
router.delete(`/api/${apiVersionV2}/commentreport/:id`, authMiddleware, (req, res) => commentReportController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/commentreport`, authMiddleware, (req, res) => commentReportController.read(req, res));
router.get(`/api/${apiVersionV2}/commentreport/:id`, authMiddleware, (req, res) => commentReportController.readById(req, res));

// Export the router for use in main application
export default router;