import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { Scheduler } from './providers/scheduler';

@Module({
  imports: [DiscoveryModule],
  providers: [Scheduler],
})
export class SchedulerModule {}
