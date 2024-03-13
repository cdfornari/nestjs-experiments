import { Inject } from '@nestjs/common';
import { CONNECTION_NAME } from '../constants/connection-name';

export const InjectSurreal = () =>
  Inject(CONNECTION_NAME);