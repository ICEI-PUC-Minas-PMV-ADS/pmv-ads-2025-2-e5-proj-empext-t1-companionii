import { PartialType } from '@nestjs/swagger';
import { CreateRecurringTasksDto } from './create-recurringTasks.dto';

export class UpdateRecurringTasksDto extends PartialType(CreateRecurringTasksDto) {}