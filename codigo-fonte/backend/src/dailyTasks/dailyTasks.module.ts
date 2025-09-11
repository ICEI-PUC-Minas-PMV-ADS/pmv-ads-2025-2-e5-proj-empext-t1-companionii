import { Module } from '@nestjs/common';
import { DailyTasksController } from './dailyTasks.controller';
import { DailyTaskService } from './dailyTask.service';

@Module({
  controllers: [DailyTasksController],
  providers: [DailyTaskService],
  exports: [DailyTaskService],
})
export class DailyTasksModule {}
