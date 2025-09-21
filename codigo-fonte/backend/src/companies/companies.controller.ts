import { Get, Body, Param, Delete, UseGuards, Controller, Put, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { CompaniesService } from "./companies.service";
import { CreateCompaniesDto } from "./dto/create-companies.dto";
import { UpdateCompaniesDto } from "./dto/update-companies.dto";

@ApiTags('companies')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() company: CreateCompaniesDto) {
    return await this.companiesService.create(company);
  }

  @Get()
  async findAll() {
    return await this.companiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() company: UpdateCompaniesDto) {
    return await this.companiesService.update(id, company);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companiesService.remove(id);
  }
}