import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { RmqModule } from './core/infrastructure/rmq';
import { SurrealModule } from './core/infrastructure/surrealdb';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RmqModule,
    SurrealModule.forRoot({
      url: process.env.READ_DB_HOST,
      port: +process.env.READ_DB_PORT,
      username: process.env.READ_DB_USER,
      password: process.env.READ_DB_PASSWORD,
      namespace: process.env.READ_DB_NAMESPACE,
      database: process.env.READ_DB_NAME,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
