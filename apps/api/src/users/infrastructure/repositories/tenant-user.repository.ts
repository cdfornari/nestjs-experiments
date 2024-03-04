import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserRepository } from 'src/users/domain';
import { TenantUser, TenantUserWithId } from '../entities/tenant-user';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class TenantUserRepository implements UserRepository {
  constructor(
    @Inject(REQUEST) private readonly requestContext: { tenantId: string },
  ) {}

  private users = [
    new TenantUserWithId(
      `tenant1@${this.requestContext.tenantId}.com`,
      'password',
      this.requestContext.tenantId,
    ),
    new TenantUserWithId(
      `tenant2@${this.requestContext.tenantId}.com`,
      'password',
      this.requestContext.tenantId,
    ),
  ];

  async findAll(): Promise<TenantUser[]> {
    return this.users;
  }

  async findById(id: string): Promise<TenantUser> {
    return this.users.find((user) => user.id === id);
  }
}
