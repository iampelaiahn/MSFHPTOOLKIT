export type SecurityRuleContext = {
  path: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  requestResourceData?: any;
};

export class FirestorePermissionError extends Error {
  context: SecurityRuleContext;

  constructor(context: SecurityRuleContext) {
    const message = `FirestoreError: Missing or insufficient permissions. Request denied by security rules.`;
    super(message);
    this.name = 'FirestorePermissionError';
    this.context = context;
    
    // This is for environments that support it (like V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FirestorePermissionError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      context: this.context,
      stack: this.stack,
    };
  }
}
