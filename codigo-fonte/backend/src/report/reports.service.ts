import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateReportDto } from "./dto/create-reports.dto";

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReportDto) {
    return await this.prisma.report.create({
      data: {
        ...data,
      },
    });
  }

  async findAll() {
    return await this.prisma.report.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.report.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<CreateReportDto>) {
    return await this.prisma.report.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return await this.prisma.report.delete({
      where: { id },
    });
  }
}