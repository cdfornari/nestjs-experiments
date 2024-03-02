import { Module } from '@nestjs/common';
import { SchedulerModule } from './core/infrastructure/scheduler';
import { CronModule } from './core/infrastructure/cron';
import { FibonacciModule } from './core/infrastructure/fibonacci';

@Module({
  imports: [SchedulerModule, CronModule, FibonacciModule],
  controllers: [],
})
export class AppModule {}
