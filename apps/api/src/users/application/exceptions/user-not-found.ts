import { ApplicationException } from 'src/core/application';

export class UserNotFoundException extends ApplicationException {
  constructor() {
    super(`User not found`);
  }
}
