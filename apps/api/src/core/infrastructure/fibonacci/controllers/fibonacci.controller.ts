import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  RequestTimeoutException,
} from '@nestjs/common';
import { FibonacciWorkerHost } from '../providers/fibonacci-worker.host';
import { CircuitBreaker } from '../../circuit-breaker';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciWorkerHost: FibonacciWorkerHost) {}

  @Get('infinity')
  @CircuitBreaker({
    failureThreshold: 3,
    successThreshold: 3,
    openToHalfOpenWaitTime: 60000,
  })
  async infinity() {
    console.log('infinity called');
    throw new RequestTimeoutException('Service not responding');
  }

  @Get('/:n')
  async fibonacci(@Param('n', ParseIntPipe) n: number) {
    return this.fibonacciWorkerHost.run(n);
  }

}
