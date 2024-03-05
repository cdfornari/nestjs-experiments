import { DomainEvent } from 'src/core/domain';
import { Enterprise } from '../value-objects/enterprise';
import { UserId } from '../value-objects/user-id';

export class UserHiredEvent extends DomainEvent {
  constructor(
    public readonly id: UserId,
    public readonly enterprise: Enterprise,
  ) {
    super();
  }

  static create = (id: UserId, enterprise: Enterprise): UserHiredEvent => {
    return new UserHiredEvent(id, enterprise);
  };
}
