import {Get, Param, Post, Body, Controller, Delete, Put} from '@nestjs/common';
import { CreateDailyTasksDto } from './dto/create-dailyTasks.dto';
import { DailyTaskService } from './dailyTask.service';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('daily-tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('daily-tasks')
export class DailyTasksController {
    constructor(private readonly dailyTaskService: DailyTaskService) {}

    @Post()
    async create(@Body() data: CreateDailyTasksDto) {
        return this.dailyTaskService.create(data);
    }

    @Get('user/:userId')
    async findAllByUserId(@Param('userId') userId: string) {
        return this.dailyTaskService.findAllByUserId(userId);
    }   

    @Get()
    async findAll() {
        return this.dailyTaskService.findAll();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: Partial<CreateDailyTasksDto>) {
        return this.dailyTaskService.update(id, data);
    }    

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.dailyTaskService.remove(id);
    }
}