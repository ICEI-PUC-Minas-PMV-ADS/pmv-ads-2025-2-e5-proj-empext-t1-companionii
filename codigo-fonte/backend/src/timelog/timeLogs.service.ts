import { Injectable } from "@nestjs/common";
import { CreateTimeLogsDto } from "./dto/create-timeLogs.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TimeLogsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTimeLogsDto) {
    return await this.prisma.timeLogs.create({
      data: {
        ...data,
      },
    });
  }

  async update(id: string, data: Partial<CreateTimeLogsDto>) {
    return await this.prisma.timeLogs.update({
      where: { id },
      data,
    });
  }

  async findAll() {
    return await this.prisma.timeLogs.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.timeLogs.findUnique({
      where: { id },
    });
  }

  async remove(id: string) {
    return await this.prisma.timeLogs.delete({
      where: { id },
    });
  }
}