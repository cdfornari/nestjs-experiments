import { IsString, IsUUID } from 'class-validator';

export class FireUserDto {
  @IsString()
  @IsUUID()
  id: string;
}
