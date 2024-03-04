import { Module } from '@nestjs/common';
import { MockUserRepository } from './repositories/user-mock.repository';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user';
import { TenantUserRepository } from './repositories/tenant-user.repository';
import { TenantUserController } from './controllers/tenant-user.controller';
import { TenantUser } from './entities/tenant-user';
import { I18nModule } from 'src/core/infrastructure/i18n';

@Module({
  imports: [I18nModule],
  controllers: [UserController, TenantUserController],
  providers: [
    { provide: User, useClass: MockUserRepository },
    { provide: TenantUser, useClass: TenantUserRepository },
  ],
})
export class UserModule {}
