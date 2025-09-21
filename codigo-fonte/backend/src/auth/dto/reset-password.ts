import { Transform } from 'class-transformer';
import { IsString, IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsString() token: string;

  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
