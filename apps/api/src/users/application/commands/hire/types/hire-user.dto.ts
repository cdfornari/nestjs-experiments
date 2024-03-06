import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';

export type HireUserDto = {
  id: string;
  enterprise: EnterpriseType;
};
