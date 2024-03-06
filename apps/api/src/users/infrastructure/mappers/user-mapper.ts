import { Injectable } from '@nestjs/common';
import { EntityMapper } from 'src/core/application';
import { Email, Enterprise, UserId } from 'src/users/domain';
import { User } from 'src/users/domain/user';
import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';

type UserType = {
  id: string;
  email: string;
  enterprise?: EnterpriseType;
};

@Injectable()
export class UserMapper implements EntityMapper<User, UserType> {
  fromDomainToPersistence(entity: User): UserType {
    return {
      id: entity.id.value,
      email: entity.email.value,
      enterprise: entity.enterprise?.value,
    };
  }

  fromPersistenceToDomain(persistenceEntity: UserType): User {
    return new User(
      new UserId(persistenceEntity.id),
      new Email(persistenceEntity.email),
      persistenceEntity.enterprise
        ? new Enterprise(persistenceEntity.enterprise)
        : undefined,
    );
  }
}
