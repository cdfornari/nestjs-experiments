import { Module } from '@nestjs/common';
import { FibonacciController } from './controllers/fibonacci.controller';
import { FibonacciWorkerHost } from './providers/fibonacci-worker.host';

@Module({
  controllers: [FibonacciController],
  providers: [FibonacciWorkerHost],
})
export class FibonacciModule {}
