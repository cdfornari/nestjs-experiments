import { Module } from '@nestjs/common';
import { MockUserRepository } from './repositories/user-mock.repository';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user';
import { TenantUserRepository } from './repositories/tenant-user.repository';
import { TenantUserController } from './controllers/tenant-user.controller';
import { TenantUser } from './entities/tenant-user';
import { I18nModule } from 'src/core/infrastructure/i18n';
import { GetUsersHandler } from './query-handlers/get-users.handler';
import { UserMapper } from './mappers/user-mapper';
import { FireUsersHandler } from './command-handlers/fire-user.handler';
import { HireUsersHandler } from './command-handlers/hire-user.handler';
import { EventHandlerModule } from 'src/core/infrastructure/event-handler/event-handler.module';
import { READ_DATABASE, WRITE_DATABASE } from './constants';

@Module({
  imports: [I18nModule, EventHandlerModule],
  controllers: [UserController, TenantUserController],
  providers: [
    { provide: User, useClass: MockUserRepository },
    { provide: TenantUser, useClass: TenantUserRepository },
    { provide: READ_DATABASE, useClass: MockUserRepository },
    { provide: WRITE_DATABASE, useClass: MockUserRepository },
    UserMapper,
    GetUsersHandler,
    HireUsersHandler,
    FireUsersHandler,
  ],
})
export class UserModule {}
