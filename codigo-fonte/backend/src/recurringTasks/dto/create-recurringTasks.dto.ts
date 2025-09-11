import { UpdateDailyTasksDto } from 'src/dailyTasks/dto/update-dailyTaks.dto';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRecurringTasksDto {
  @IsNotEmpty()
  userId    : string;

  @IsNotEmpty()
  companyId : string;
  
  @IsString()
  @IsNotEmpty()
  title     : string;

  @IsString()
  @IsNotEmpty()
  description: string;
  
  @IsString()
  @IsNotEmpty()
  frequency : string;

  estimatedMin: number;

  isActive  : boolean;

  generatedDaily: UpdateDailyTasksDto[] | [];
}