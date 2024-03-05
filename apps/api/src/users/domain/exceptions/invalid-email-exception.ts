import { DomainException } from 'src/core/domain';

export class InvalidEmailException extends DomainException {
  constructor(email?: string) {
    super(`Invalid email ${email ?? ''}`.trim());
  }
}
