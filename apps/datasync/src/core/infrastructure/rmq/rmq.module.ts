import { Module } from '@nestjs/common';
import { RmqService } from './providers/rmq.service';

@Module({
  imports: [],
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {}
