import express from "express";
import { CommunityReportController } from "../controllers/communityReportController";
import { authMiddleware } from "../middleware/authMiddleware";
import { createBaseRoutes } from "./BaseRoutes";
import { validateCommunityReportMiddlewareV2 } from "../validations/CommunityReportValidation";

// Initialize express Router
const router = express.Router();

// Create instance of CommunityReportController to handle route logic
const communityReportController = new CommunityReportController();

/**
 * @swagger
 * tags:
 *   name: CommunityReport
 *   description: Community Report endpoints
 */

/**
 * @swagger
 * /api/community-reports:
 *   post:
 *     summary: Create a new community report
 *     tags: [CommunityReport]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CommunityReport'
 *     responses:
 *       201:
 *         description: Community report created successfully
 *       400:
 *         description: Validation error
 *   get:
 *     summary: Get all community reports
 *     tags: [CommunityReport]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of community reports
 */

/**
 * @swagger
 * /api/community-reports/{id}:
 *   get:
 *     summary: Get community report by ID
 *     tags: [CommunityReport]
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
 *         description: Community report details
 *       404:
 *         description: Report not found
 *   delete:
 *     summary: Delete community report
 *     tags: [CommunityReport]
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
 *         description: Community report deleted successfully
 *       404:
 *         description: Report not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CommunityReport:
 *       type: object
 *       properties:
 *         ReportID:
 *           type: integer
 *         CommunityID:
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
 *           type: integer
 *           nullable: true
 *         ReviewedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         ActionTaken:
 *           type: string
 *           nullable: true
 */

/** Apply versioning to community report routes */
const apiVersionV1 = 'v1';
const apiVersionV2 = 'v2';

// v1 - No validation
router.use(`/api/${apiVersionV1}/community-reports`, authMiddleware, createBaseRoutes(communityReportController));

// v2 - With validation only for create, update, delete
router.post(`/api/${apiVersionV2}/community-reports`, authMiddleware, validateCommunityReportMiddlewareV2, (req, res) => communityReportController.create(req, res));
router.put(`/api/${apiVersionV2}/community-reports/:id`, authMiddleware, validateCommunityReportMiddlewareV2, (req, res) => communityReportController.update(req, res));
router.delete(`/api/${apiVersionV2}/community-reports/:id`, authMiddleware, (req, res) => communityReportController.delete(req, res));

// Optional: Other routes without validation (e.g., get)
router.get(`/api/${apiVersionV2}/community-reports`, authMiddleware, (req, res) => communityReportController.read(req, res));
router.get(`/api/${apiVersionV2}/community-reports/:id`, authMiddleware, (req, res) => communityReportController.readById(req, res));

// Export the router for use in main application
export default router;
