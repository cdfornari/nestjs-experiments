import { SetMetadata } from '@nestjs/common';

export const TIMEOUT_KEY = 'TIMEOUT_KEY';
export const Timeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);
