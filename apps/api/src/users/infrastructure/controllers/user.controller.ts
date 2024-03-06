import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { EntityExistsPipe } from '../../../core/infrastructure/pipes/entity-exists.pipe';
import { User } from '../entities/user';
import { I18nService } from 'src/core/infrastructure/i18n';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetUsersQueryType } from '../query-handlers/get-users.handler';
import { FireUserDto } from './dtos/fire-user.dto';
import { FireUserCommandType } from '../command-handlers/fire-user.handler';
import { HireUserDto } from 'src/users/application';
import { HireUserCommandType } from '../command-handlers/hire-user.handler';

@Controller('user')
export class UserController {
  constructor(
    //@Inject(User)
    //private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getUsers() {
    return this.queryBus.execute(new GetUsersQueryType());
  }

  @Get('hello/:name')
  async hello(@Param('name') name: string) {
    return this.i18nService.translate('HELLO', {
      name,
    });
  }

  @Get('not-found/:name')
  async notFound(@Param('name') name: string) {
    return this.i18nService.translate('ERRORS.USER_NOT_FOUND', {
      name,
    });
  }

  @Get(':id')
  async getUserById(@Param('id', EntityExistsPipe(User)) user: User) {
    //return this.queryBus.execute(new GetUserByIdQueryType(user.id));
    return user;
  }

  @Post('fire')
  async fireUser(@Body() { id }: FireUserDto) {
    return this.commandBus.execute(new FireUserCommandType(id));
  }

  @Post('hire')
  async hireUser(@Body() { id, enterprise }: HireUserDto) {
    return this.commandBus.execute(new HireUserCommandType(id, enterprise));
  }
}
