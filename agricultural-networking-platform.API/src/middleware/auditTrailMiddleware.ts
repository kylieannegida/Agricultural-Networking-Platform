import { Request, Response, NextFunction } from 'express';
import AuditTrail from '../models/auditTrailModel';
import { CustomRequest } from '../interfaces/customRequestInterface';

const auditTrailMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  res.on('finish', async () => {
    try {
      const eventType = req.method;
      let description = `Request to ${req.originalUrl} with method ${req.method}`;
      const dataChanges = req.body || {};

      // ✅ **Extract userId properly**
      const userId = req.userId || res.locals.userId || null;  // ⬅️ Siguruhing userId ay hindi null

      console.log('✅ Audit Log - Extracted User ID:', userId); // Debugging log

      if (!userId) {
        console.warn('⚠️ Warning: No userId found for this request.');
        return; // Skip logging if userId is missing
      }

      // ✅ **Ensure login/logout captures userId**
      if (req.originalUrl.includes('/login')) {
        description = `User ${userId} logged in`;
      } else if (req.originalUrl.includes('/logout')) {
        description = `User ${userId} logged out`;
      } else {
        if (req.method === 'POST') {
          description = `User ${userId} created a new record at ${req.originalUrl}`;
        } else if (req.method === 'PUT') {
          description = `User ${userId} updated a record at ${req.originalUrl}`;
        } else if (req.method === 'DELETE') {
          description = `User ${userId} deleted a record at ${req.originalUrl}`;
        } else if (req.method === 'GET' && req.params.id) {
          description = `User ${userId} read a record by ID at ${req.originalUrl}`;
        }
      }

      // ✅ **Save audit log**
      await AuditTrail.create({ 
        userId,
        eventType, 
        dataChanges, 
        description, 
        timestamp: new Date() 
      });

      console.log('✅ Audit Log Saved:', { userId, eventType, description });

    } catch (error) {
      console.error('❌ Error logging audit trail:', error);
    }
  });

  next();
};

export default auditTrailMiddleware;
