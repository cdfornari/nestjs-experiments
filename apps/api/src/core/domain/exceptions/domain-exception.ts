export abstract class DomainException extends Error {
  constructor(message: string, protected _name: string) {
    super(message);
  }

  get name() {
    return this._name;
  }
}
