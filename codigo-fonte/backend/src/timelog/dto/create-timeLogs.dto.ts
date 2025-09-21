import { IsNumber, IsString } from "class-validator";

export class CreateTimeLogsDto {
  @IsString()
  dailyTaskId: string;

  dailyTask: any;
  startTime: Date;
  endTime?: Date;

  @IsNumber()
  durationMin?: number;
}