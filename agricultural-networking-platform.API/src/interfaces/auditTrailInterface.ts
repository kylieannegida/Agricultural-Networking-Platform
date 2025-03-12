export interface IAuditTrail {
    userId: string;
    eventType: string;
    dataChanges: Record<string, any>;
    description: string;
    timestamp: Date;
  }
  