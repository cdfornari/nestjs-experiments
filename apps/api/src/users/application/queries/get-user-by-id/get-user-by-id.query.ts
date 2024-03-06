import { ApplicationService, Result } from 'src/core/application';
import { GetUserByIdDto } from './types/get-user-by-id.dto';
import { UserId, UserRepository } from 'src/users/domain';
import { UserNotFoundException } from '../../exceptions/user-not-found';
import { GetUserByIdResponse } from './types/response.type';

export class GetUserByIdQuery
  implements ApplicationService<GetUserByIdDto, GetUserByIdResponse>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: GetUserByIdDto): Promise<Result<GetUserByIdResponse>> {
    const user = await this.userRepository.findUserById(new UserId(data.id));
    if (!user) return Result.failure(new UserNotFoundException());
    return Result.success<GetUserByIdResponse>({
      id: user.id.value,
      email: user.email.value,
      enterprise: user.enterprise.value,
    });
  }
}
