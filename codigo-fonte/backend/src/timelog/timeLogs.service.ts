import { Injectable } from '@nestjs/common';
import { CreateTimeLogsDto } from './dto/create-timeLogs.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TimeLogsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTimeLogsDto) {
    return await this.prisma.timeLog.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<CreateTimeLogsDto>) {
    return await this.prisma.timeLog.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return await this.prisma.timeLog.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.timeLog.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.timeLog.delete({
      where: { id },
    });
  }
}
