import { ApplicationService } from '../services/application-service';
import { Result } from '../result-wrapper/result';
import { DomainException } from 'src/core/domain';
import { ExceptionMapper } from '../mappers/exceptions/exception-mapper';
import { ApplicationException } from '../exceptions/application-exception';

export class ExceptionParserDecorator<T, U>
  implements ApplicationService<T, U>
{
  constructor(
    private service: ApplicationService<T, U>,
    private exceptionMapper: ExceptionMapper,
  ) {}

  async execute(data: T): Promise<Result<U>> {
    try {
      const result = await this.service.execute(data);
      if (result.isFailure) result.unwrap();
      return result;
    } catch (error) {
      if (
        error instanceof DomainException ||
        error instanceof ApplicationException
      )
        throw this.exceptionMapper.toHttp(error);
      throw error;
    }
  }
}
