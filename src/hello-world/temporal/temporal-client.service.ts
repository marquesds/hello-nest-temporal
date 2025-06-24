import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { helloWorldWorkflow } from './hello-world.workflow';
import { TemporalConfig } from './temporal.config';

@Injectable()
export class TemporalClientService {
  private client: Client;
  private readonly logger = new Logger(TemporalClientService.name);

  constructor() {
    this.client = new Client({
      namespace: TemporalConfig.namespace
    });
  }

  async startHelloWorldWorkflow(name: string): Promise<string> {
    try {
      this.logger.log('TemporalClientService: Starting hello world workflow', { name });

      const handle = await this.client.workflow.start(helloWorldWorkflow, {
        args: [name],
        taskQueue: TemporalConfig.taskQueue,
        workflowId: `hello-world-${name}-${Date.now()}`
      });

      this.logger.log('TemporalClientService: Workflow started', {
        workflowId: handle.workflowId,
        name
      });

      const result = await handle.result();

      this.logger.log('TemporalClientService: Workflow completed', {
        workflowId: handle.workflowId,
        result
      });

      return result;
    } catch (error) {
      this.logger.error('TemporalClientService: Failed to start or execute workflow', error);
      throw error;
    }
  }

  async getWorkflowStatus(workflowId: string) {
    try {
      const handle = this.client.workflow.getHandle(workflowId);
      const status = await handle.describe();
      return status;
    } catch (error) {
      this.logger.error('TemporalClientService: Failed to get workflow status', error);
      throw error;
    }
  }
}
