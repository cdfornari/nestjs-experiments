import { DomainEvent } from 'src/core/domain';
import { Email } from '../value-objects/email';
import { Enterprise } from '../value-objects/enterprise';
import { UserId } from '../value-objects/user-id';

export class UserCreatedEvent extends DomainEvent {
  constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly enterprise?: Enterprise,
  ) {
    super();
  }

  static create = (
    id: UserId,
    email: Email,
    enterprise?: Enterprise,
  ): UserCreatedEvent => {
    return new UserCreatedEvent(id, email, enterprise);
  };
}
