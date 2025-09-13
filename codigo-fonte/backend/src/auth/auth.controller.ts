import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { GoogleAuthGuard } from '../common/guards/google.guard';
import { ForgotPasswordDto } from './dto/forgot-password';
import { ResetPasswordDto } from './dto/reset-password';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private cfg: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.validate(dto.email, dto.password);
    return this.auth.sign({ id: user.id, email: user.email, role: user.role });
  }

  @Post('forgot-password')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  async forgot(@Body() dto: ForgotPasswordDto) {
    return await this.auth.requestPasswordReset(dto.email);
  }

  @Post('reset-password')
  async reset(@Body() dto: ResetPasswordDto) {
    return await this.auth.resetPassword(dto.token, dto.password);
  }

  @Post('accept-invite')
  @UseGuards(ThrottlerGuard)
  async acceptInvite(@Body() dto: AcceptInviteDto, @Res() res: Response) {
    const token = await this.auth.acceptInvite(
      dto.token,
      dto.name,
      dto.password,
    );
    const redirect = this.cfg.get<string>('INVITE_SUCCESS_REDIRECT');
    if (redirect) {
      return res.redirect(`${redirect}?token=${token.access_token}`);
    }
    return res.json(token);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleLogin() {
    // redirect to Google OAuth2 login page
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiExcludeEndpoint()
  googleCallback(@Req() req: any, @Res() res: Response) {
    const user = req.user; // came from GoogleStrategy.validate() and attached to req by Passport
    const token = this.auth.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const url = this.cfg.get<string>('OAUTH_SUCCESS_REDIRECT');
    if (url) {
      const redirect = `${url}?token=${token.access_token}`;
      return res.redirect(redirect);
    }
    return res.json(token);
  }
}
