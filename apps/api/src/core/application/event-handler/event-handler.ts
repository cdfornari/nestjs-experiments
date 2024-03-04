import { DomainEvent } from 'src/core/domain';

type Subscription = {
  unsubscribe: () => void;
};

export interface EventHandler {
  publishEvents(events: DomainEvent[]): void;
  subscribe(
    event: DomainEvent,
    callback: (event: DomainEvent) => Promise<void>,
  ): Subscription;
}
