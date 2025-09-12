import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCompaniesDto {
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  colorHex: string;

  @IsString()
  description: string;

  //   recurringTasks : RecurringTask[];
  //   dailyTasks     : DailyTask[];
  //   reports        : Report[];
  //   integrations   : Integration[];
}
