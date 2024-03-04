import { DomainException } from 'src/core/domain';
import { ApplicationException } from '../../exceptions/application-exception';

export interface ExceptionMapper {
  fromDomainToApplication(
    domainException: DomainException,
  ): ApplicationException;
}
