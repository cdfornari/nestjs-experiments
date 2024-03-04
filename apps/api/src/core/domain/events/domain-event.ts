export abstract class DomainEvent {
  constructor(protected _time = new Date()) {}

  get time() {
    return this._time;
  }

  static eventName = this.constructor.name;
}
