import { Injectable } from '@nestjs/common';
import { UserWithId } from '../entities/user';

@Injectable()
export class MockUserRepository {
  private users = [new UserWithId('test@test.com', 'password')];

  async findAll() {
    return this.users;
  }

  async findById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
