import { Injectable } from '@nestjs/common';
import {
  InjectSurreal,
  SurrealService,
} from 'src/core/infrastructure/surrealdb';
import { User, UserId, UserRepository } from 'src/users/domain';
import { SurrealUserMapper } from '../mappers/surreal-user-mapper';

@Injectable()
export class SurrealUserRepository implements UserRepository {
  constructor(
    @InjectSurreal()
    private readonly surreal: SurrealService,
    private mapper: SurrealUserMapper,
  ) {}

  async saveUser(user: User): Promise<void> {
    const _user = await this.findUserById(user.id);
    const recordId = '`' + user.id.value + '`';
    if (_user) {
      await this.surreal.update(
        `user:${recordId}`,
        this.mapper.fromDomainToPersistence(user),
      );
      return;
    }
    await this.surreal.create(
      `user:${recordId}`,
      this.mapper.fromDomainToPersistence(user),
    );
  }

  async findUserById(id: UserId): Promise<User | null> {
    const recordId = '`' + id.value + '`';
    const result: any[] = await this.surreal.select(`user:${recordId}`);
    if (!result || result.length === 0) return null;
    const user = result[0];
    return this.mapper.fromPersistenceToDomain({
      id: id.value,
      email: user.email,
      enterprise: user.enterprise,
    });
  }

  async findUsers(): Promise<User[]> {
    return (await this.surreal.select('user') as any[]).map((user) =>
      this.mapper.fromPersistenceToDomain({
        id: user.id,
        email: user.email,
        enterprise: user.enterprise,
      }),
    );
  }
}
