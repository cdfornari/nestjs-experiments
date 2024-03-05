import { DomainException } from 'src/core/domain';

export class InvalidEnterpriselException extends DomainException {
  constructor(enterprise?: string) {
    super(`Invalid enterprise ${enterprise ?? ''}`.trim());
  }
}
