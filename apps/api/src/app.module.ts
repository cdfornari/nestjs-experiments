import { Module } from '@nestjs/common';
import { SchedulerModule } from './core/infrastructure/scheduler';
import { CronModule } from './core/infrastructure/cron';

@Module({
  imports: [SchedulerModule, CronModule],
  controllers: [],
})
export class AppModule {}
