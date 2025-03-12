import { Schema, model } from 'mongoose';
import { IAuditTrail } from '../interfaces/auditTrailInterface';

const AuditTrailSchema = new Schema<IAuditTrail>(
  {
    userId: { type: String, required: true },
    eventType: { type: String, required: true },
    dataChanges: { type: Object, required: true },
    description: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const AuditTrail = model<IAuditTrail>('AuditTrail', AuditTrailSchema);

export default AuditTrail;
