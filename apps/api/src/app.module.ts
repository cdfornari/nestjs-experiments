import { Module } from '@nestjs/common';
import { SchedulerModule } from './core/infrastructure/scheduler';
import { CronModule } from './core/infrastructure/cron';
import { FibonacciModule } from './core/infrastructure/fibonacci';
import { UserModule } from './users/infrastructure';

@Module({
  imports: [SchedulerModule, CronModule, FibonacciModule, UserModule],
  controllers: [],
})
export class AppModule {}
