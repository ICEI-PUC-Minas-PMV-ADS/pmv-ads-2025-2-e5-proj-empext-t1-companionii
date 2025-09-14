import { IsHexColor, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateProjectDto {
  @IsString() name: string;
  @IsUUID() companyId: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsHexColor() colorHex?: string;
}
