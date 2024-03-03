import { Controller, Get, Inject, Param } from '@nestjs/common';
import { EntityExistsPipe } from '../../../core/infrastructure/pipes/entity-exists.pipe';
import { User } from '../entities/user';
import { UserRepository } from 'src/users/domain';

@Controller('user')
export class UserController {
  constructor(
    @Inject(User)
    private readonly userRepository: UserRepository
  ) {}

  @Get()
  async getUsers() {
    return this.userRepository.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id', EntityExistsPipe(User)) user: User) {
    return user;
  }
}
