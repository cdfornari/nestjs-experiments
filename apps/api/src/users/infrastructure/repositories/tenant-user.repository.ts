import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Enterprise, UserId, UserRepository, User } from '../../domain';
import { TenantUserWithId } from '../entities/tenant-user';
import { UserMapper } from '../mappers/user-mapper';

@Injectable({ scope: Scope.REQUEST, durable: true })
export class TenantUserRepository implements UserRepository {
  constructor(
    @Inject(REQUEST) private readonly requestContext: { tenantId: string },
    private readonly userMapper: UserMapper,
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

  async findUsers() {
    return this.users.map((user) =>
      this.userMapper.fromPersistenceToDomain(user as any),
    );
  }

  async findUserById(id: UserId) {
    const user = this.users.find((user) => user.id === id.value);
    return user ? this.userMapper.fromPersistenceToDomain(user as any) : null;
  }

  async saveUser(user: User) {
    if (this.users.find((u) => u.id === user.id.value)) {
      this.users = this.users.map((u) => {
        if (u.id === user.id.value)
          return this.userMapper.fromDomainToPersistence(user);
        return u;
      }) as any;
      return;
    }
    this.users.push(this.userMapper.fromDomainToPersistence(user) as any);
  }

  async updateUserEnterprise(id: UserId, enterprise: Enterprise) {
    this.users = this.users.map((u) => {
      if (u.id === id.value) return { ...u, enterprise };
      return u;
    }) as any;
  }

  async removeUserEnterprise(id: UserId) {
    this.users = this.users.map((u) => {
      if (u.id === id.value) return { ...u, enterprise: undefined };
      return u;
    }) as any;
  }
}
