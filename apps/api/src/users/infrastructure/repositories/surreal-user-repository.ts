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
    if (_user) {
      await this.surreal.merge(
        `user:${user.id.value}`,
        this.mapper.fromDomainToPersistence(user),
      );
      return;
    }
    await this.surreal.create(
      `user:${user.id.value}`,
      this.mapper.fromDomainToPersistence(user),
    );
  }

  async findUserById(id: UserId): Promise<User | null> {
    const [result]: any[] = await this.surreal.select(`user:${id.value}`);
    if (!result) return null;
    return this.mapper.fromPersistenceToDomain({
      id: id.value,
      email: result.email,
      enterprise: result.enterprise,
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
