import { Module } from '@nestjs/common';
import { SchedulerModule } from './core/infrastructure/scheduler';

@Module({
  imports: [SchedulerModule],
  controllers: [],
})
export class AppModule {}
