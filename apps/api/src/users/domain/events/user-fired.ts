import { DomainEvent } from 'src/core/domain';
import { UserId } from '../value-objects/user-id';

export class UserFiredEvent extends DomainEvent {
  constructor(public readonly id: UserId) {
    super();
  }

  static create = (id: UserId): UserFiredEvent => {
    return new UserFiredEvent(id);
  };
}
