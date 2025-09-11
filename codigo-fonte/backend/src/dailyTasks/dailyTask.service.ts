import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { CreateDailyTasksDto } from "./dto/create-dailyTasks.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class DailyTaskService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateDailyTasksDto) {
        return this.prisma.dailyTask.create({ data });
    }

    async findAllByUserId(userId: string) {
        return this.prisma.dailyTask.findMany({ where: { userId } });
    }   

    async findAll() {
        return this.prisma.dailyTask.findMany();
    }

    async update(id: string, data: Partial<CreateDailyTasksDto>) {
        return this.prisma.dailyTask.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.dailyTask.delete({
            where: { id },
        });
    }
}