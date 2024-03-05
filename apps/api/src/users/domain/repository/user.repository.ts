import { User } from '../user';
import { Enterprise } from '../value-objects/enterprise';
import { UserId } from '../value-objects/user-id';

export interface UserRepository {
  saveUser: (user: User) => Promise<void>;
  findUserById: (id: UserId) => Promise<User | null>;
  updateUserEnterprise: (id: UserId, enterprise: Enterprise) => Promise<void>;
  removeUserEnterprise: (id: UserId) => Promise<void>;
}
