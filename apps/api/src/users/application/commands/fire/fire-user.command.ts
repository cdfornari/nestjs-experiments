import { ApplicationService, EventHandler, Result } from 'src/core/application';
import { FireUserDto } from './types/fire-user.dto';
import { FireUserResponse } from './types/response.type';
import { UserId, UserRepository } from 'src/users/domain';
import { UserNotFoundException } from '../../exceptions/user-not-found';

export class FireUserCommand
  implements ApplicationService<FireUserDto, FireUserResponse>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventHandler: EventHandler,
  ) {}

  async execute(data: FireUserDto): Promise<Result<FireUserResponse>> {
    const user = await this.userRepository.findUserById(new UserId(data.id));
    if (!user) return Result.failure(new UserNotFoundException());
    user.fire();
    await this.userRepository.saveUser(user);
    this.eventHandler.publishEvents(user.pullEvents());
    return Result.success<FireUserResponse>({
      id: user.id.value,
    });
  }
}
