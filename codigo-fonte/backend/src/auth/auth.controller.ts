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
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { GoogleAuthGuard } from '../common/guards/google.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private users: UsersService,
    private cfg: ConfigService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const user = await this.auth.validate(dto.email, dto.password);
    return this.auth.sign({ id: user.id, email: user.email, role: user.role });
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.users.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
      role: dto.role,
    });
    return { id: user.id, email: user.email };
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
