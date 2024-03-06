import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventHandler } from 'src/core/application';
import { DomainEvent } from 'src/core/domain';

@Injectable()
export class NestEventHandler implements EventHandler {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishEvents(events: DomainEvent[]): void {
    events.forEach((event) => {
      this.eventEmitter.emit(event.eventName, event);
    });
  }

  subscribe(
    event: DomainEvent,
    callback: (event: DomainEvent) => Promise<void>,
  ): { unsubscribe: () => void } {
    this.eventEmitter.on(event.eventName, callback);
    return {
      unsubscribe: () => {
        this.eventEmitter.off(event.eventName, callback);
      },
    };
  }
}
