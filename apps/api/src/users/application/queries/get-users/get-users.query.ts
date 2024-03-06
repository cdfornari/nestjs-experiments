import { ApplicationService, Result } from 'src/core/application';
import { UserRepository } from 'src/users/domain';
import { GetUsersResponse } from './types/response.type';

export class GetUsersQuery
  implements ApplicationService<void, GetUsersResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<Result<GetUsersResponse>> {
    const users = await this.userRepository.findUsers();
    return Result.success<GetUsersResponse>(
      users.map((user) => ({
        id: user.id.value,
        email: user.email.value,
        enterprise: user.enterprise?.value,
      })),
    );
  }
}
