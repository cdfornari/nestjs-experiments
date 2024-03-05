import { DomainException } from 'src/core/domain';

export class InvalidEmailException extends DomainException {
  constructor() {
    super(`Invalid User`);
  }
}
