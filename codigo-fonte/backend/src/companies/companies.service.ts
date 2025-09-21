import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompaniesDto } from './dto/create-companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompaniesDto) {
    return await this.prisma.company.create({
      data: {
        ...createCompanyDto,
      },
    });
  }   
  
  async findAll() {
      return this.prisma.company.findMany();
  } 

  async findById(id: string) {
      return this.prisma.company.findUnique({
          where: { id },
      });
  }

  async findByOwnerId(ownerId: string) {
      return this.prisma.company.findMany({
          where: { ownerId },
      });
  }

  async update(id: string, data: any) {
      return this.prisma.company.update({
          where: { id },
          data,
      });
  }

  async remove(id: string) {
      return this.prisma.company.delete({
          where: { id },
      });
  } 
}