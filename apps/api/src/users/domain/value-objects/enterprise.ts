import { ValueObject } from 'src/core/domain';
import { InvalidEnterpriseException } from '../exceptions/invalid-enterprise-exception';

export type EnterpriseType =
  | 'apple'
  | 'google'
  | 'microsoft'
  | 'amazon'
  | 'facebook'
  | 'tesla';

export class Enterprise implements ValueObject<Enterprise> {
  constructor(private readonly _value: EnterpriseType) {
    const regex = /^(apple|google|microsoft|amazon|facebook|tesla)$/;
    if (!regex.test(_value)) throw new InvalidEnterpriseException(_value);
  }

  public equals(other: Enterprise): boolean {
    return this._value === other._value;
  }

  get value(): EnterpriseType {
    return this._value;
  }
}
