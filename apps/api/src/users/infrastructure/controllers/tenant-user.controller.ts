import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserRepository } from 'src/users/domain';
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
    return this.tenantUserRepository.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.tenantUserRepository.findById(id);
  }
}
