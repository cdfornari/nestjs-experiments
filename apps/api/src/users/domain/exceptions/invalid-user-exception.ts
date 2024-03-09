import { DomainException } from 'src/core/domain';

export class InvalidUserException extends DomainException {
  constructor() {
    super(`Invalid User`);
  }
}
