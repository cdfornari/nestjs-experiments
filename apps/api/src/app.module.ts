import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SchedulerModule } from './core/infrastructure/scheduler';
import { CronModule } from './core/infrastructure/cron';
import { FibonacciModule } from './core/infrastructure/fibonacci';
import { UserModule } from './users/infrastructure';
import { PaymentsModule } from './payments/infrastructure';
import { I18nModule } from './core/infrastructure/i18n';

@Module({
  imports: [
    CqrsModule.forRoot(),
    EventEmitterModule.forRoot(),
    SchedulerModule,
    CronModule,
    FibonacciModule,
    UserModule,
    PaymentsModule,
    I18nModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
