import { Module } from '@nestjs/common';
import { NestEventHandler } from './nest-event-handler';

@Module({
  providers: [NestEventHandler],
  exports: [NestEventHandler],
})
export class EventHandlerModule {}
