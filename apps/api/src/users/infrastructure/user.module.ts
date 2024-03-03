import { Module } from '@nestjs/common';
import { MockUserRepository } from './repositories/user-mock.repository';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user';

@Module({
  controllers: [UserController],
  providers: [{ provide: User, useClass: MockUserRepository }],
})
export class UserModule {}
