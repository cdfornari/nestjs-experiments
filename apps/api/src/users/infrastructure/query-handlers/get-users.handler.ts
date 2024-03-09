import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/domain';
import { ExceptionParserDecorator } from 'src/core/application';
import { GetUsersQuery, GetUsersResponse } from 'src/users/application';
import { READ_DATABASE } from '../constants';
import { UserExceptionMapper } from '../mappers/user-exception-mapper';

export class GetUsersQueryType {}

@QueryHandler(GetUsersQueryType)
export class GetUsersHandler implements IQueryHandler<GetUsersQueryType> {
  constructor(
    @Inject(READ_DATABASE)
    private readonly userRepository: UserRepository,
    private readonly exceptionMapper: UserExceptionMapper,
  ) {}

  async execute() {
    const service = new ExceptionParserDecorator<void, GetUsersResponse>(
      new GetUsersQuery(this.userRepository),
      this.exceptionMapper,
    );
    const result = await service.execute();
    return result.unwrap();
  }
}
