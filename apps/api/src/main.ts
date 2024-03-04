import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AggregateByTenantContextIdStrategy,
  AggregateByLocaleContextIdStrategy,
} from './core/infrastructure/strategies';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());
  await app.listen(3000);
}
bootstrap();
