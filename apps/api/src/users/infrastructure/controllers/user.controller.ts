import { Controller, Get, Inject, Param } from '@nestjs/common';
import { MockUserRepository } from '../repositories/user-mock.repository';
import { EntityExistsPipe } from '../../../core/infrastructure/pipes/entity-exists.pipe';
import { User } from '../entities/user';

@Controller('user')
export class UserController {
  constructor(
    @Inject(User)
    private readonly userRepository: MockUserRepository
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
