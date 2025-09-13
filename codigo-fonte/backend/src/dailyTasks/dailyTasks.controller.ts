import { Get, Param, Body, Controller, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DailyTaskService } from './dailyTask.service';
import { RolesGuard } from '../common/guards/roles.guard';

@ApiTags('daily-tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('daily-tasks')
export class DailyTasksController {
  constructor(private readonly dailyTaskService: DailyTaskService) {}

  //   @Post()
  //   async create(@Body() data: CreateDailyTasksDto) {
  //     return this.dailyTaskService.create(data);
  //   }

  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: string) {
    return this.dailyTaskService.findAllByUserId(userId);
  }

  @Get()
  async findAll() {
    return this.dailyTaskService.findAll();
  }

  //   @Put(':id')
  //   async update(
  //     @Param('id') id: string,
  //     @Body() data: Partial<CreateDailyTasksDto>,
  //   ) {
  //     return this.dailyTaskService.update(id, data);
  //   }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dailyTaskService.remove(id);
  }
}
