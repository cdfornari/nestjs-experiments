import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enterprise, User, UserId, UserRepository } from 'src/users/domain';
import { OrmUser } from '../entities/orm-user';
import { OrmUserMapper } from '../mappers/orm-user-mapper';

@Injectable()
export class OrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(OrmUser)
    private readonly datasource: Repository<OrmUser>,
    private mapper: OrmUserMapper,
  ) {}

  async saveUser(user: User): Promise<void> {
    this.datasource.save(this.mapper.fromDomainToPersistence(user));
  }

  async findUserById(id: UserId): Promise<User | null> {
    const user = await this.datasource.findOneBy({
      id: id.value,
    });
    if(!user) return null;
    return this.mapper.fromPersistenceToDomain(user);
  }

  async findUsers(): Promise<User[]> {
    const users = await this.datasource.find();
    return users.map((user) => this.mapper.fromPersistenceToDomain(user));
  }
}
