import { ContextIdFactory, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  AggregateByTenantContextIdStrategy,
  AggregateByLocaleContextIdStrategy,
} from './core/infrastructure/strategies';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  ContextIdFactory.apply(new AggregateByLocaleContextIdStrategy());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
