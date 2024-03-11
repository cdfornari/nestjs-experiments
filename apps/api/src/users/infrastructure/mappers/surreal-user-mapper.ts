import { Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/core/application';
import { Email, Enterprise, User, UserId } from 'src/users/domain';
import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';

export type SurrealUser = {
  id?: string;
  email: string;
  enterprise: EnterpriseType | null;
};

@Injectable()
export class SurrealUserMapper implements EntityMapper<User, SurrealUser> {
  fromDomainToPersistence(entity: User): SurrealUser {
    return {
      email: entity.email.value,
      enterprise: entity.enterprise?.value ?? null,
    };
  }

  fromPersistenceToDomain(persistenceEntity: SurrealUser): User {
    return new User(
      new UserId(persistenceEntity.id),
      new Email(persistenceEntity.email),
      persistenceEntity.enterprise
        ? new Enterprise(persistenceEntity.enterprise)
        : null,
    );
  }
}
