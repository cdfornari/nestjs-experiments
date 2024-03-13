import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { USER_QUEUE } from 'src/core/infrastructure/rmq-client';
import { UserRepository } from 'src/users/domain';
import { WRITE_DATABASE } from '../constants';

@Injectable()
export class InitUserSync implements OnModuleInit {
  constructor(
    @Inject(USER_QUEUE)
    private readonly rmqClient: ClientProxy,
    @Inject(WRITE_DATABASE)
    private readonly userRepository: UserRepository,
  ) {}

  async onModuleInit() {
    const users = await this.userRepository.findUsers();
    if (users.length === 0) return;
    try {
      await lastValueFrom(
        this.rmqClient.emit(
          'init',
          users.map((user) => ({
            id: user.id.value,
            email: user.email.value,
            enterprise: user.enterprise?.value ?? null,
          })),
        ),
      );
    } catch (error) {
      console.error('Error syncing users', error);
    }
  }
}
