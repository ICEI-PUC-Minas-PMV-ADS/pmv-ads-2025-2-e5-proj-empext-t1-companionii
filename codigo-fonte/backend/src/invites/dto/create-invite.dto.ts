import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

export class CreateInviteDto {
  @IsEmail() email: string;
  @IsOptional() @IsEnum(Role) role?: Role;
  @IsOptional() @IsString() companyId?: string;
}
