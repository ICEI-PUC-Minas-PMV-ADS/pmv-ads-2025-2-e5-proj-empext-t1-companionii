import { Module } from '@nestjs/common';
import { TimeLogsController } from './timeLogs.controller';
import { TimeLogsService } from './timeLogs.service';

@Module({
  controllers: [TimeLogsController],
  providers: [TimeLogsService],
  exports: [TimeLogsService],
})
export class TimeLogsModule {}