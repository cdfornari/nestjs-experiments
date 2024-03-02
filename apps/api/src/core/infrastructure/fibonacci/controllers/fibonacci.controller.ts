import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FibonacciWorkerHost } from '../providers/fibonacci-worker.host';

@Controller('fibonacci')
export class FibonacciController {
  constructor(private readonly fibonacciWorkerHost: FibonacciWorkerHost) {}

  @Get('/:n')
  async fibonacci(@Param('n', ParseIntPipe) n: number) {
    return this.fibonacciWorkerHost.run(n);
  }
}
