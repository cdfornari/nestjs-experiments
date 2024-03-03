interface ICircuitBreakerOptions {
  failureThreshold?: number;
  successThreshold?: number;
  openToHalfOpenWaitTime?: number;
}
