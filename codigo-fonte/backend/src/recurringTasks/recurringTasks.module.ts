import { Module } from '@nestjs/common';
import { RecurringTaskService } from './recurringTasks.service';
import { RecurringTasksController } from './recurringTasks.controller';

@Module({
  controllers: [RecurringTasksController],
  providers: [RecurringTaskService],
  exports: [RecurringTaskService],
})
export class RecurringTasksModule {}
