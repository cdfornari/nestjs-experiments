import { User } from 'src/users/infrastructure/entities/user';

export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
}
