import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserId, UserRepository } from 'src/users/domain';
import { TenantUser } from '../entities/tenant-user';

@Controller('tenant')
export class TenantUserController {
  constructor(
    @Inject(TenantUser)
    private readonly tenantUserRepository: UserRepository,
  ) {
    console.log(this);
  }

  @Get()
  async getUsers() {
    return this.tenantUserRepository.findUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.tenantUserRepository.findUserById(new UserId(id));
  }
}
