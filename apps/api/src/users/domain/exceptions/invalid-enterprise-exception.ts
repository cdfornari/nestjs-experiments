import { DomainException } from 'src/core/domain';

export class InvalidEnterpriseException extends DomainException {
  constructor(enterprise?: string) {
    super(`Invalid enterprise ${enterprise ?? ''}`.trim());
  }
}
