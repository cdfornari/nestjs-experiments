import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { CircuitBreakerInterceptor } from '../providers/circuit-breaker.interceptor';

export function CircuitBreaker(options: ICircuitBreakerOptions = {}) {
  return applyDecorators(
    UseInterceptors(new CircuitBreakerInterceptor(options)),
  );
}
