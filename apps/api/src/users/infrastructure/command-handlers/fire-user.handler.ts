import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { UserRepository } from 'src/users/domain';
import { lastValueFrom } from 'rxjs';
import { ExceptionParserDecorator } from 'src/core/application';
import {
  FireUserCommand,
  FireUserDto,
  FireUserResponse,
} from 'src/users/application';
import { NestEventHandler } from 'src/core/infrastructure/event-handler/nest-event-handler';
import { WRITE_DATABASE } from '../constants';
import { UserExceptionMapper } from '../mappers/user-exception-mapper';
import { USER_QUEUE } from 'src/core/infrastructure/rmq-client';
import { UserFiredEvent } from 'src/users/domain/events/user-fired';

export class FireUserCommandType {
  constructor(public readonly id: string) {}
}

@CommandHandler(FireUserCommandType)
export class FireUsersHandler implements ICommandHandler<FireUserCommandType> {
  constructor(
    @Inject(WRITE_DATABASE)
    private readonly userRepository: UserRepository,
    private readonly eventHandler: NestEventHandler,
    private readonly exceptionMapper: UserExceptionMapper,
    @Inject(USER_QUEUE)
    private readonly rmqClient: ClientProxy,
  ) {}

  async execute(command: FireUserCommandType) {
    this.eventHandler.subscribe(
      UserFiredEvent,
      async (event: UserFiredEvent) => {
        await lastValueFrom(
          this.rmqClient.emit('user-fired', {
            id: event.id.value,
          }),
        );
      },
    );
    const service = new ExceptionParserDecorator<FireUserDto, FireUserResponse>(
      new FireUserCommand(this.userRepository, this.eventHandler),
      this.exceptionMapper,
    );
    const result = await service.execute({
      id: command.id,
    });
    return result.unwrap();
  }
}
