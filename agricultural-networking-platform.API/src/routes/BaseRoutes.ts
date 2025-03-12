import express, { Router } from "express";
import { BaseController } from "../controllers/baseController";
import { Document } from "mongoose";
import { authMiddleware } from "../middleware/authMiddleware";
import auditTrailMiddleware from "../middleware/auditTrailMiddleware";

export const createBaseRoutes = <T extends Document>(
  controller: BaseController<T>
): Router => {
  const router = express.Router();

  router.post("/", authMiddleware, auditTrailMiddleware, controller.create.bind(controller));
  router.get("/",authMiddleware, controller.read.bind(controller));
  router.get("/:id", authMiddleware, auditTrailMiddleware, controller.readById.bind(controller));
  router.put("/:id", authMiddleware, auditTrailMiddleware, controller.update.bind (controller));
  router.delete("/:id", authMiddleware, auditTrailMiddleware, controller.delete.bind(controller));

  return router;
}; 