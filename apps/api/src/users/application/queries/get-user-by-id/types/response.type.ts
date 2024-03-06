import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';

export type GetUserByIdResponse = {
  id: string;
  email: string;
  enterprise?: EnterpriseType;
};
