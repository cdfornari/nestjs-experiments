import { User } from '../user';
import { UserId } from '../value-objects/user-id';

export interface UserRepository {
  saveUser: (user: User) => Promise<void>;
  findUserById: (id: UserId) => Promise<User | null>;
  findUsers: () => Promise<User[]>;
}
