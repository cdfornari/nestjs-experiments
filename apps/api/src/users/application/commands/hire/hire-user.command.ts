import { ApplicationService, EventHandler, Result } from 'src/core/application';
import { HireUserDto } from './types/hire-user.dto';
import { HireUserResponse } from './types/response.type';
import { Enterprise, UserId, UserRepository } from 'src/users/domain';
import { UserNotFoundException } from '../../exceptions/user-not-found';

export class HireUserCommand
  implements ApplicationService<HireUserDto, HireUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventHandler: EventHandler,
  ) {}

  async execute(data: HireUserDto): Promise<Result<HireUserResponse>> {
    const user = await this.userRepository.findUserById(new UserId(data.id));
    if (!user) return Result.failure(new UserNotFoundException());
    user.hire(new Enterprise(data.enterprise));
    await this.userRepository.saveUser(user);
    this.eventHandler.publishEvents(user.pullEvents());
    return Result.success<HireUserResponse>({
      id: user.id.value,
    });
  }
}
