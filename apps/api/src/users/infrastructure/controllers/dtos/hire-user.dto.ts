import { IsIn, IsString, IsUUID } from 'class-validator';
import { EnterpriseType } from 'src/users/domain/value-objects/enterprise';

export class HireUserDto {
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsIn(['apple', 'google', 'facebook', 'microsoft', 'amazon', 'tesla'])
  enterprise: EnterpriseType;
}
