import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from './core/infrastructure/rmq';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('USER'));
  await app.startAllMicroservices();
}
bootstrap(); 
