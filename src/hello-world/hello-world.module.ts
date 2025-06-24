import { Module } from '@nestjs/common';
import { LosTemporalController } from './controllers/los-temporal.controller';
import { TemporalClientService } from './temporal/temporal-client.service';
import { TemporalWorkerService } from './temporal/temporal-worker.service';

@Module({
  controllers: [LosTemporalController],
  providers: [TemporalWorkerService, TemporalClientService],
  exports: [TemporalWorkerService, TemporalClientService]
})
export class HelloWorldModule {}
