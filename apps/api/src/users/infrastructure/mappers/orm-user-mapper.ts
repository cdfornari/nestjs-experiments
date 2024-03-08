import { Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/core/application';
import { Email, Enterprise, UserId } from 'src/users/domain';
import { User } from 'src/users/domain/user';
import { OrmUser } from '../entities/orm-user';

@Injectable()
export class OrmUserMapper implements EntityMapper<User, OrmUser> {
  fromDomainToPersistence(entity: User): OrmUser {
    return new OrmUser(
      entity.id.value,
      entity.email.value,
      entity.enterprise?.value ?? null,
    );
  }

  fromPersistenceToDomain(persistenceEntity: OrmUser): User {
    return new User(
      new UserId(persistenceEntity.id),
      new Email(persistenceEntity.email),
      persistenceEntity.enterprise
        ? new Enterprise(persistenceEntity.enterprise)
        : null,
    );
  }
}
