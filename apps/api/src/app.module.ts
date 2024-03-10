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
import { SurrealModule } from './core/infrastructure/surrealdb/surrealdb.module';

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
    SurrealModule.forRoot({
      url: process.env.READ_DB_HOST,
      port: +process.env.READ_DB_PORT,
      username: process.env.READ_DB_USER,
      password: process.env.READ_DB_PASSWORD,
      namespace: process.env.READ_DB_NAMESPACE,
      database: process.env.READ_DB_NAME,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
