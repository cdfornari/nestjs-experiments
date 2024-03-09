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
  ) {}

  async execute(command: HireUserCommandType) {
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
