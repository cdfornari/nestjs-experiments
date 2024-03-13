import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import {
  TimeoutError,
  catchError,
  firstValueFrom,
  of,
  throwError,
  timeout,
} from 'rxjs';
import { InjectSurreal, SurrealService } from './core/infrastructure/surrealdb';
import { RmqService } from './core/infrastructure/rmq';

@Controller()
export class AppController {
  constructor(
    @InjectSurreal()
    private readonly surreal: SurrealService,
    private readonly rmqService: RmqService,
  ) {}
  private readonly logger = new Logger(AppController.name);

  @EventPattern('init')
  async handleInit(
    @Payload()
    data: { id: string; enterprise?: string; email: string }[],
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('Init');
    const users = data;
    const transaction = async () => {
      await Promise.all(
        users.map(async ({ id, email, enterprise }) => {
          const recordId = '`' + id + '`';
          const result = await this.surreal.select(`user:${recordId}`);
          if (!result) {
            return this.surreal.create(`user:${recordId}`, {
              email,
              enterprise: enterprise ?? null,
            });
          }
          return this.surreal.update(`user:${recordId}`, {
            email,
            enterprise: enterprise ?? null,
          });
        }),
      );
    };
    await firstValueFrom(this.transactionWithCallback(transaction, 60000));
    this.rmqService.ack(context);
  }

  @EventPattern('user-hired')
  async handleUserHired(
    @Payload() data: { id: string; enterprise: string },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('User hired event', data);
    const transaction = async () => {
      const recordId = '`' + data.id + '`';
      const result = await this.surreal.select(`user:${recordId}`);
      if (!result) throw new Error('User not found');
      await this.surreal.merge(`user:${recordId}`, {
        enterprise: data.enterprise,
      });
    };
    await firstValueFrom(this.transactionWithCallback(transaction));
    this.rmqService.ack(context);
  }

  @EventPattern('user-fired')
  async handleUserFired(
    @Payload() data: { id: string },
    @Ctx() context: RmqContext,
  ) {
    this.logger.log('User fired event', data);
    const transaction = async () => {
      const recordId = '`' + data.id + '`';
      const result = await this.surreal.select(`user:${recordId}`);
      if (!result) throw new Error('User not found');
      await this.surreal.update(`user:${recordId}`, {
        email: result.email,
        enterprise: null,
      });
    };
    await firstValueFrom(this.transactionWithCallback(transaction));
    this.rmqService.ack(context);
  }

  private transactionWithCallback(callback: () => Promise<void>, time = 5000) {
    const source = of(callback()).pipe(timeout(time));
    return source.pipe(
      catchError((error) => {
        if (error instanceof TimeoutError) {
          // Handle timeout error here
          return throwError(() => new Error('Request timed out!')); // Or return another observable
        } else {
          // Handle other errors
          return throwError(() => new Error(error));
        }
      }),
    );
  }
}
