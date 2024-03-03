import { Type } from '@nestjs/common';
import { randomUUID } from 'crypto';

export function WithId<T extends Type>(Base: T) {
  return class extends Base {
    id = randomUUID();

    regenerateUuid() {
      this.id = randomUUID();
    }
  };
}
