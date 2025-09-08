import { randomBytes, createHash } from 'crypto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private jwt: JwtService,
    private prisma: PrismaService,
    private mailer: MailerService,
    private cfg: ConfigService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  sign(user: { id: string; email: string; role: string }) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwt.sign(payload) };
  }

  async requestPasswordReset(email: string) {
    const user = await this.users.findByEmail(email);
    if (!user)
      return { message: 'Se existir, enviaremos instruções por e-mail.' };

    await this.prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    const token = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30min

    await this.prisma.passwordResetToken.create({
      data: { userId: user.id, tokenHash, expiresAt },
    });

    const base = this.cfg.get<string>('WEBAPP_RESET_URL');
    const url = `${base}?token=${token}`;
    await this.mailer.sendPasswordReset(user.email, url);

    return { message: 'If exists, we will send an email with instructions' };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const entry = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!entry || entry.consumedAt || entry.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired token');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: entry.userId },
        data: { passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { tokenHash },
        data: { consumedAt: new Date() },
      }),
      this.prisma.passwordResetToken.deleteMany({
        where: { userId: entry.userId, consumedAt: null, NOT: { tokenHash } },
      }),
    ]);

    return { message: 'Password reseted successfully' };
  }
}
