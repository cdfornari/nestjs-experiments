import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/domain';
import { ExceptionCatcherDecorator } from 'src/core/application';
import { GetUsersQuery, GetUsersResponse } from 'src/users/application';

export class GetUsersQueryType {}

@QueryHandler(GetUsersQueryType)
export class GetUsersHandler implements IQueryHandler<GetUsersQueryType> {
  constructor(
    @Inject('USER_READ_REPOSITORY')
    private readonly userRepository: UserRepository
  ) {}

  async execute() {
    const service = new ExceptionCatcherDecorator<void, GetUsersResponse>(
      new GetUsersQuery(this.userRepository),
    );
    const result = await service.execute();
    return result.unwrap();
  }
}
