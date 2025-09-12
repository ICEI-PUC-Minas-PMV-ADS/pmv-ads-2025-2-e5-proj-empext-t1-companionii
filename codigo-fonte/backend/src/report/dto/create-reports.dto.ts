import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  user: any;

  @IsString()
  @IsNotEmpty()
  companyId: string;

  company: any;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  aiSummary: string;
  periodStart: Date;
  periodEnd: Date;

  @IsNumber()
  totalTasks: number;

  @IsNumber()
  totalMinutes: number;

  @IsString()
  @IsNotEmpty()
  pdfPath: string;
}