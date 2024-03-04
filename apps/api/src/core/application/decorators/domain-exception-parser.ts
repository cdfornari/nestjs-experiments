import { ApplicationService } from '../services/application-service';
import { Result } from '../result-wrapper/result';
import { DomainException } from 'src/core/domain';
import { ExceptionMapper } from '../mappers/exceptions/exception-mapper';

export class DomainExceptionParserDecorator<T, U>
  implements ApplicationService<T, U>
{
  constructor(
    private service: ApplicationService<T, U>,
    private exceptionMapper: ExceptionMapper,
  ) {}

  async execute(data: T): Promise<Result<U>> {
    try {
      return await this.service.execute(data);
    } catch (error) {
      if (error instanceof DomainException)
        return Result.failure(
          this.exceptionMapper.fromDomainToApplication(error),
        );
      throw error;
    }
  }
}
