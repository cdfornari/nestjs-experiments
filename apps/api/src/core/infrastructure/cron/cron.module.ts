import { Module } from '@nestjs/common';
import { CronService } from './providers/cron.service';

@Module({
  providers: [CronService],
})
export class CronModule {}
