import { Module } from '@nestjs/common';
import { PaymentsWebhookController } from './controllers/payments.webhook.controller';
import { PaymentNotificationsService } from './providers/payment-notifications.service';
import { SubscriptionService } from './providers/subscription.service';
import { EventContext } from './providers/event-context';

@Module({
  controllers: [PaymentsWebhookController],
  providers: [PaymentNotificationsService, SubscriptionService, EventContext],
})
export class PaymentsModule {}
