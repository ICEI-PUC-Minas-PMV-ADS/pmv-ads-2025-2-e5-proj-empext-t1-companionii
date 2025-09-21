import { UseGuards, Controller, Body, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./dto/create-reports.dto";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('reports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(createReportDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateReportDto>) {
    return await this.reportsService.update(id, data);
  }

  @Get()
  async findAll() {
    return await this.reportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reportsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reportsService.remove(id);
  }
}