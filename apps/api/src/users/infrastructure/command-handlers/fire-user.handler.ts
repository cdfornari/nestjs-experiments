import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/domain';
import { ExceptionCatcherDecorator } from 'src/core/application';
import {
  FireUserCommand,
  FireUserDto,
  FireUserResponse,
} from 'src/users/application';
import { NestEventHandler } from 'src/core/infrastructure/event-handler/nest-event-handler';

export class FireUserCommandType {
  constructor(public readonly id: string) {}
}

@CommandHandler(FireUserCommandType)
export class FireUsersHandler implements ICommandHandler<FireUserCommandType> {
  constructor(
    @Inject('USER_READ_REPOSITORY')
    private readonly userRepository: UserRepository,
    private readonly eventHandler: NestEventHandler,
  ) {}

  async execute(command: FireUserCommandType) {
    const service = new ExceptionCatcherDecorator<
      FireUserDto,
      FireUserResponse
    >(new FireUserCommand(this.userRepository, this.eventHandler));
    const result = await service.execute({
      id: command.id,
    });
    return result.unwrap();
  }
}
