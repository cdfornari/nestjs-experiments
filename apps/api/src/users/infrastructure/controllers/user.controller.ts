import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { EntityExistsPipe } from '../../../core/infrastructure/pipes/entity-exists.pipe';
import { User } from '../entities/user';
import { UserRepository } from 'src/users/domain';
import { I18nService } from 'src/core/infrastructure/i18n';

@Controller('user')
export class UserController {
  constructor(
    @Inject(User)
    private readonly userRepository: UserRepository,
    private readonly i18nService: I18nService,
  ) {}

  @Get()
  async getUsers() {
    return this.userRepository.findAll();
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
    return user;
  }
}
