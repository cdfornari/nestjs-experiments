import { ValueObject } from 'src/core/domain';
import { InvalidEmailException } from '../exceptions/invalid-email-exception';

export class Email implements ValueObject<Email> {
  constructor(private readonly _value: string) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(_value)) throw new InvalidEmailException(_value);
  }

  public equals(other: Email): boolean {
    return this._value === other._value;
  }

  get value(): string {
    return this._value;
  }
}
