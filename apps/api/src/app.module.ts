import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerModule } from './core/infrastructure/scheduler';
import { CronModule } from './core/infrastructure/cron';
import { FibonacciModule } from './core/infrastructure/fibonacci';
import { UserModule } from './users/infrastructure';
import { PaymentsModule } from './payments/infrastructure';
import { I18nModule } from './core/infrastructure/i18n';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    SchedulerModule,
    CronModule,
    FibonacciModule,
    UserModule,
    PaymentsModule,
    I18nModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.WRITE_DB_HOST,
      port: +process.env.WRITE_DB_PORT,
      username: process.env.WRITE_DB_USERNAME,
      password: process.env.WRITE_DB_PASSWORD,
      database: process.env.WRITE_DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
