import { ValueObject } from 'src/core/domain';

export class UserId implements ValueObject<UserId> {
  constructor(private readonly _value: string) {}

  public equals(other: UserId): boolean {
    return this._value === other._value;
  }

  get value(): string {
    return this._value;
  }
}
