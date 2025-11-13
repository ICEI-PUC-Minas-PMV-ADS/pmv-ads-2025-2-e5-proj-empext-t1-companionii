import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateProjectDto, userId: string) {
    return this.prisma.project.create({
      data: {
        ...dto,
        createdById: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        colorHex: true,
        companyId: true,
        createdById: true,
      },
    });
  }

  async findAll(filter: { companyId?: string }) {
    return this.prisma.project.findMany({
      where: {
        companyId: filter.companyId || undefined,
      },
      select: {
        id: true,
        name: true,
        description: true,
        colorHex: true,
        companyId: true,
      },
    });
  }

  async findAllSelect(filter: { companyId?: string }) {
    return this.prisma.project.findMany({
      where: {
        companyId: filter.companyId || undefined,
      },
      select: {
        id: true,
        name: true,
        companyId: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        colorHex: true,
        companyId: true,
      },
    });
  }

  async update(id: string, dto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        ...dto,
      },
      select: {
        id: true,
        name: true,
        description: true,
        colorHex: true,
        companyId: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async listByProjectsMember(userId: string) {
    if (!userId) {
      throw new Error('User ID is required');
    }

    return this.prisma.project.findMany({
      where: {
        members: { some: { userId } },
      },
      select: {
        id: true,
        name: true,
        description: true,
        colorHex: true,
        companyId: true,
      },
    });
  }

  async metrics(projectId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        companyId: true,
      },
    });

    return {
      projectId: project.id,
      projectName: project.name,
      companyId: project.companyId,
    };
  }

  async listTags(projectId: string, options: { q?: string; take?: number }) {
    return this.prisma.projectMember.findMany({
      where: {
        projectId,
      },
      select: {
        tags: {
          where: options.q
            ? { tag: { name: { contains: options.q } } }
            : undefined,
          take: options.take || 20,
          select: {
            tag: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  }
}
