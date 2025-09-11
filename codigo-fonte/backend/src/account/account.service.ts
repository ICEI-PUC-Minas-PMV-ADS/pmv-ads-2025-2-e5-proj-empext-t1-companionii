import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateAccountDto) {
    return this.prisma.account.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: string) {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }
  
  async update(id: string, data: Partial<CreateAccountDto>) {
    return this.prisma.account.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.account.delete({
      where: { id },
    });
  }
}