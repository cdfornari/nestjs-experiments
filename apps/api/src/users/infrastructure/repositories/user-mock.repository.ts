import { Injectable } from '@nestjs/common';
import { UserWithId } from '../entities/user';
import { Enterprise, UserId, UserRepository } from '../../domain';
import { UserMapper } from '../mappers/user-mapper';
import { User } from 'src/users/domain/user';

@Injectable()
export class MockUserRepository implements UserRepository {
  private users = [new UserWithId('test@test.com', 'password')];

  constructor(private readonly userMapper: UserMapper) {}

  async findUsers() {
    return this.users.map((user) =>
      this.userMapper.fromPersistenceToDomain(user),
    );
  }

  async findUserById(id: UserId) {
    const user = this.users.find((user) => user.id === id.value);
    return user ? this.userMapper.fromPersistenceToDomain(user) : null;
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
