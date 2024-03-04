import { WithId } from '../../../core/infrastructure/mixins/with-id.mixin';
import { User } from './user';

export class TenantUser extends User {
  constructor(email: string, password: string, public enterprise: string) {
    super(email, password);
  }
}

export const TenantUserWithId = WithId(TenantUser);
