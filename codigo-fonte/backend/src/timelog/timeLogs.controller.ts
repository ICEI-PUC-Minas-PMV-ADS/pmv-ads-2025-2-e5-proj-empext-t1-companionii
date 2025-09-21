import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { TimeLogsService } from "./timeLogs.service";
import { CreateTimeLogsDto } from "./dto/create-timeLogs.dto";

@ApiTags('timeLogs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('timeLogs')
export class TimeLogsController {
  constructor(private readonly timeLogsService: TimeLogsService) {}

  @Post()
  async create(@Body() createTimeLogsDto: CreateTimeLogsDto) {
    return await this.timeLogsService.create(createTimeLogsDto);
  }

  @Get()
  async findAll() {
    return await this.timeLogsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.timeLogsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<CreateTimeLogsDto>) {
    return await this.timeLogsService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.timeLogsService.remove(id);
  } 
}