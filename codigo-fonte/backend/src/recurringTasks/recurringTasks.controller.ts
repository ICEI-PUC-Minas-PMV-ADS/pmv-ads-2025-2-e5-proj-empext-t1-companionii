import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RecurringTaskService } from 'src/recurringTasks/recurringTasks.service';

@ApiTags('recurring-tasks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('recurring-tasks')  
export class RecurringTasksController {
    constructor(private recurringTasksService: RecurringTaskService) {}

    @Get()
    async findAll() {
        return this.recurringTasksService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.recurringTasksService.findById(id);
    }

    @Post()
    async create(@Body() data: any) {
        return this.recurringTasksService.create(data);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: any) {
        return this.recurringTasksService.update(id, data);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.recurringTasksService.remove(id);
    }
}