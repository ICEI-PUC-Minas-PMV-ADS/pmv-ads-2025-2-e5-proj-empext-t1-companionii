import { BoardStatus, TaskPriority } from '@prisma/client';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateTaskDto {
  @IsUUID() projectId: string;
  @IsString() title: string;
  @IsOptional() @IsString() description?: string;

  @IsOptional() @IsEnum(BoardStatus) status?: BoardStatus;
  @IsOptional() @IsEnum(TaskPriority) priority?: TaskPriority;

  @IsOptional() @IsDateString() dueDate?: string;
  @IsOptional() @IsInt() @Min(0) estimatedMin?: number;

  @IsOptional() @IsArray() @IsString({ each: true }) tags?: string[];
}
