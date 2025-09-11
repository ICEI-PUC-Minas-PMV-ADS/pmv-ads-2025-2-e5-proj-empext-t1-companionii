import { IsNumber, IsString } from "class-validator";
import { OAuthProvider } from "src/common/enums/oauthprovider.enum";

export class CreateAccountDto {
  @IsString()
  userId: string;

  user: any;

  @IsString()
  provider: OAuthProvider;

  @IsString()
  providerAccountId: string;

  @IsString()
  accessToken: string;
  
  @IsString()
  refreshToken: string;

  @IsNumber()
  expiresAt: number;

  // TODO: Relation between Account and Company
  // as described in Figma create account design
  // companyId: string | null;
}