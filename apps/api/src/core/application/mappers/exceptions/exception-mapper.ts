import { DomainException } from 'src/core/domain';
import { ApplicationException } from '../../exceptions/application-exception';

export interface ExceptionMapper {
  toHttp(exception: DomainException | ApplicationException): Error;
}
