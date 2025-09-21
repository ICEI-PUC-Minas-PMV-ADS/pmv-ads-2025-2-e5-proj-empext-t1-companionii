import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../common/enums/role.enum';

@Injectable()
export class InvitesService {
  constructor(
    private auth: AuthService,
    private prisma: PrismaService,
  ) {}

  async create(
    invitedById: string,
    email: string,
    role?: Role,
    companyId?: string,
  ) {
    return await this.auth.createInvite(invitedById, email, role, companyId);
  }

  async findAll() {
    return await this.prisma.invite.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async revoke(id: string) {
    return await this.prisma.invite.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }
}
