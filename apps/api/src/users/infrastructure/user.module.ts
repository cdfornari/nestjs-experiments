import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { OrmUser } from './entities/orm-user';
import { OrmUserRepository } from './repositories/orm-user-repository';
import { OrmUserMapper } from './mappers/orm-user-mapper';
import { UserExceptionMapper } from './mappers/user-exception-mapper';
import { SurrealUserMapper } from './mappers/surreal-user-mapper';
import { SurrealUserRepository } from './repositories/surreal-user-repository';
import {
  RmqClientModule,
  USER_QUEUE,
} from 'src/core/infrastructure/rmq-client';
import { InitUserSync } from './providers/init-user-sync';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrmUser]),
    I18nModule,
    EventHandlerModule,
    RmqClientModule.register({ name: USER_QUEUE }),
  ],
  controllers: [UserController, TenantUserController],
  providers: [
    { provide: User, useClass: MockUserRepository },
    { provide: TenantUser, useClass: TenantUserRepository },
    { provide: READ_DATABASE, useClass: SurrealUserRepository },
    { provide: WRITE_DATABASE, useClass: OrmUserRepository },
    UserMapper,
    OrmUserMapper,
    SurrealUserMapper,
    UserExceptionMapper,
    GetUsersHandler,
    HireUsersHandler,
    FireUsersHandler,
    InitUserSync,
  ],
})
export class UserModule {}
