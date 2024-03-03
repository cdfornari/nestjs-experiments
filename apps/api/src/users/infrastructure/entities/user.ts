import { WithId } from '../../../core/infrastructure/mixins/with-id.mixin';

export class User {
  constructor(public email: string, public password: string) {}
}

export const UserWithId = WithId(User);
