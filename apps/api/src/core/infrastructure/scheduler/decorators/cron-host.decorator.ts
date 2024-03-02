import { SetMetadata } from '@nestjs/common';

export const CRON_HOST_KEY = 'CRON_HOST_KEY';
export const CronHost: ClassDecorator = SetMetadata(
  CRON_HOST_KEY,
  true,
);
