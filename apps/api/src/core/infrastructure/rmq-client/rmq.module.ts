import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RmqClientModuleOptions {
  name: string;
}

@Module({})
export class RmqClientModule {
  static register({ name }: RmqClientModuleOptions) {
    return {
      module: RmqClientModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RABBITMQ_URL')],
                queue: configService.get<string>(
                  `RABBITMQ_${name.toUpperCase()}_QUEUE`,
                ),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
