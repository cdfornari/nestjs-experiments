import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/users/domain';
import { ExceptionParserDecorator } from 'src/core/application';
import {
  HireUserCommand,
  HireUserDto,
  HireUserResponse,
} from 'src/users/application';
import { NestEventHandler } from 'src/core/infrastructure/event-handler/nest-event-handler';
import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';
import { WRITE_DATABASE } from '../constants';
import { UserExceptionMapper } from '../mappers/user-exception-mapper';
import { UserHiredEvent } from 'src/users/domain/events/user-hired';
import { lastValueFrom } from 'rxjs';
import { USER_QUEUE } from 'src/core/infrastructure/rmq-client';
import { ClientProxy } from '@nestjs/microservices';

export class HireUserCommandType {
  constructor(
    public readonly id: string,
    public readonly enterprise: EnterpriseType,
  ) {}
}

@CommandHandler(HireUserCommandType)
export class HireUsersHandler implements ICommandHandler<HireUserCommandType> {
  constructor(
    @Inject(WRITE_DATABASE)
    private readonly userRepository: UserRepository,
    private readonly eventHandler: NestEventHandler,
    private readonly exceptionMapper: UserExceptionMapper,
    @Inject(USER_QUEUE)
    private readonly rmqClient: ClientProxy,
  ) {}

  async execute(command: HireUserCommandType) {
    this.eventHandler.subscribe(
      UserHiredEvent,
      async (event: UserHiredEvent) => {
        await lastValueFrom(
          this.rmqClient.emit('user-hired', {
            id: event.id.value,
            enterprise: event.enterprise.value,
          }),
        );
      },
    );
    const service = new ExceptionParserDecorator<HireUserDto, HireUserResponse>(
      new HireUserCommand(this.userRepository, this.eventHandler),
      this.exceptionMapper,
    );
    const result = await service.execute({
      id: command.id,
      enterprise: command.enterprise,
    });
    return result.unwrap();
  }
}
