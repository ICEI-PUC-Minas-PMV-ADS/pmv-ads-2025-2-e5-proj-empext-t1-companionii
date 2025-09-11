import { PartialType } from '@nestjs/swagger';
import { CreateTimeLogsDto } from './create-timeLogs.dto';

export class UpdateTimeLogsDto extends PartialType(CreateTimeLogsDto) {}
