import { PartialType } from '@nestjs/swagger';
import { CreateDailyTasksDto } from './create-dailyTasks.dto';

export class UpdateDailyTasksDto extends PartialType(CreateDailyTasksDto) {}
