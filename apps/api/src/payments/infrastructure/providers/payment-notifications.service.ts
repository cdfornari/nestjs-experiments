import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { OnEvent } from '@nestjs/event-emitter';
import { EventContext } from './event-context';
import { PaymentFailedEvent } from '../events/payment-failed.event';

@Injectable()
export class PaymentNotificationsService {
  constructor(private readonly moduleRef: ModuleRef) {}

  @OnEvent(PaymentFailedEvent.key)
  async sendPaymentNotification(event: PaymentFailedEvent) {
    const eventContext = await this.moduleRef.resolve(
      EventContext,
      event.meta.contextId,
    );
    console.log(
      'Sending a payment notification',
      eventContext.request.url,
      event.paymentId,
    );
  }
}
