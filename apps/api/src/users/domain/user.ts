import { AggregateRoot } from 'src/core/domain';
import { UserId } from './value-objects/user-id';
import { Email } from './value-objects/email';
import { Enterprise } from './value-objects/enterprise';
import { UserCreatedEvent } from './events/user-created';
import { UserHiredEvent } from './events/user-hired';
import { UserFiredEvent } from './events/user-fired';

export class User extends AggregateRoot<UserId> {
  constructor(
    protected _id: UserId,
    protected _email: Email,
    protected _enterprise?: Enterprise,
  ) {
    super(_id);
    this.on(UserCreatedEvent.create(_id, _email, _enterprise));
  }

  validateState(): void {
    if (!this._id || !this._email) {
      throw new Error('User is invalid');
    }
  }

  isEmployed(): boolean {
    return !!this._enterprise;
  }

  hire(enterprise: Enterprise): void {
    const userHiredEvent = UserHiredEvent.create(this._id, enterprise);
    this._enterprise = userHiredEvent.enterprise;
    this.on(userHiredEvent);
  }

  fire(): void {
    this._enterprise = undefined;
    this.on(UserFiredEvent.create(this._id));
  }

  get id(): UserId {
    return this._id;
  }

  get email(): Email {
    return this._email;
  }

  get enterprise(): Enterprise | undefined {
    return this._enterprise;
  }
}
