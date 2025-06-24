import { Body, Controller, Get, Param, Post, Logger } from '@nestjs/common';
import { TemporalClientService } from '../temporal/temporal-client.service';

class StartWorkflowDto {
  name: string;
}

@Controller('temporal')
export class LosTemporalController {
  private readonly logger = new Logger(LosTemporalController.name);

  constructor(private readonly temporalClientService: TemporalClientService) {}

  @Post('hello-world')
  async startHelloWorldWorkflow(@Body() body: StartWorkflowDto) {
    try {
      this.logger.log('LosTemporalController: Starting hello world workflow', { name: body.name });

      const result = await this.temporalClientService.startHelloWorldWorkflow(body.name);
      const workflowId = `hello-world-${body.name}-${Date.now()}`;

      this.logger.log('LosTemporalController: Hello world workflow completed successfully', {
        workflowId,
        name: body.name,
        result
      });

      return {
        message: result,
        workflowId
      };
    } catch (error) {
      this.logger.error('LosTemporalController: Failed to start hello world workflow', {
        name: body.name,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  @Get('workflow/:workflowId/status')
  async getWorkflowStatus(@Param('workflowId') workflowId: string) {
    try {
      this.logger.log('LosTemporalController: Getting workflow status', { workflowId });

      const status = await this.temporalClientService.getWorkflowStatus(workflowId);

      this.logger.log('LosTemporalController: Workflow status retrieved successfully', {
        workflowId,
        status: status.status?.name
      });

      return status;
    } catch (error) {
      this.logger.error('LosTemporalController: Failed to get workflow status', {
        workflowId,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }
}
