import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { CRON_HOST_KEY } from '../decorators/cron-host.decorator';
import { INTERVAL_KEY } from '../decorators/interval.decorator';
import { TIMEOUT_KEY } from '../decorators/timeout.decorator';

@Injectable()
export class Scheduler
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly callbacks: NodeJS.Timeout[] = [];

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
  ) {}

  onApplicationBootstrap() {
    const providers = this.discoveryService.getProviders();
    providers.forEach((wrapper) => {
      // console.log(wrapper.token);
      const { instance } = wrapper;
      const prototype = instance && Object.getPrototypeOf(instance);
      if (!instance || !prototype) return;
      const isCronHost =
        this.reflector.get<boolean>(CRON_HOST_KEY, instance.constructor) ??
        false;
      if (!isCronHost) return;
      const methodKeys = this.metadataScanner.getAllMethodNames(prototype);
      methodKeys.forEach((methodKey) => {
        const interval =
          this.reflector.get(INTERVAL_KEY, instance[methodKey]) ?? false;
        const timeout =
          this.reflector.get(TIMEOUT_KEY, instance[methodKey]) ?? false;
        if (interval) {
          const intervalRef = setInterval(
            () => instance[methodKey](),
            interval,
          );
          this.callbacks.push(intervalRef);
        }
        if (timeout) {
          const timeoutRef = setTimeout(() => instance[methodKey](), timeout);
          this.callbacks.push(timeoutRef);
        }
      });
    });
  }

  onApplicationShutdown() {
    this.callbacks.forEach((ref) => clearInterval(ref));
  }
}
