export abstract class ValueObject<T> {
  protected constructor(protected readonly _value: T) {}

  get value(): T {
    return this._value;
  }

  public abstract equals(other: ValueObject<T>): boolean;
}
