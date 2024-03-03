import { CallHandler } from '@nestjs/common';
import { tap, throwError } from 'rxjs';

const DEFAULT_SUCCESS_THRESHOLD = 3; // the number of successful operations above which we close the circuit
const DEFAULT_FAILURE_THRESHOLD = 3; // the number of failures above which we open the circuit
const DEFAULT_OPEN_TO_HALF_OPEN_WAIT_TIME = 60000; // 1 minute in milliseconds

enum CircuitBreakerState {
  Closed,
  Open,
  HalfOpen,
}

export class CircuitBreaker {
  private state = CircuitBreakerState.Closed;
  private failureCount = 0;
  private successCount = 0;
  private lastError: Error;
  private nextAttempt: number;

  constructor(
    private readonly failureThreshold = DEFAULT_FAILURE_THRESHOLD,
    private readonly successThreshold = DEFAULT_SUCCESS_THRESHOLD,
    private readonly openToHalfOpenWaitTime = DEFAULT_OPEN_TO_HALF_OPEN_WAIT_TIME,
  ) {}

  execute(next: CallHandler) {
    if (this.state === CircuitBreakerState.Open) {
      if (this.nextAttempt > Date.now()) {
        return throwError(() => this.lastError);
      }
      this.state = CircuitBreakerState.HalfOpen;
    }
    return next.handle().pipe(
      tap({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      }),
    );
  }

  private handleSuccess() {
    this.failureCount = 0;
    if (this.state === CircuitBreakerState.HalfOpen) {
      this.successCount++;

      if (this.successCount >= this.successThreshold) {
        this.successCount = 0;
        this.state = CircuitBreakerState.Closed;
      }
    }
  }

  private handleError(err: Error) {
    this.failureCount++;
    if (
      this.failureCount >= this.failureThreshold ||
      this.state === CircuitBreakerState.HalfOpen
    ) {
      this.state = CircuitBreakerState.Open;
      this.lastError = err;
      this.nextAttempt = Date.now() + this.openToHalfOpenWaitTime;
    }
  }
}
