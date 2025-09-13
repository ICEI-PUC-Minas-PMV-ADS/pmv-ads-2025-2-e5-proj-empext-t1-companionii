import { CreateTimeLogsDto } from '../../timelog/dto/create-timeLogs.dto';
import { TaskStatus } from '../../common/enums/taskStatus.enum';

export class CreateDailyTasksDto {
  userId: string;
  companyId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  taskDate: Date | null;
  estimatedMin: number | null;
  actualMin: number | null;
  startedAt: Date | null;
  completedAt: Date | null;
  timeLogs: CreateTimeLogsDto[] | [];
}
