export const TemporalConfig = {
  namespace: 'default',
  taskQueue: 'los-hello-world-queue',
  activityTimeout: '1 minute',
  workflowTimeout: '5 minutes',
  maxConcurrentActivityTaskExecutions: 10,
  maxConcurrentWorkflowTaskExecutions: 50
} as const;
