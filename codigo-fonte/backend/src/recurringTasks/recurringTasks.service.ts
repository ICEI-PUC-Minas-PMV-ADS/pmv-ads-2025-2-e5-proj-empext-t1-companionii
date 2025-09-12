import { PrismaService } from "src/prisma/prisma.service";

export class RecurringTaskService {
    constructor(private prisma: PrismaService) {}

    async create(data: any) {
        return this.prisma.recurringTask.create({
            data,
        });
    }   

    async findAll() {
        return this.prisma.recurringTask.findMany({
            // include: {
            //     generatedDaily: false,
            // },
        });
    }

    async findById(id: string) {
        return this.prisma.recurringTask.findUnique({
            where: { id },
            // include: {
            //     generatedDaily: true,
            // },
        });
    }

    async findByCompanyId(companyId: string) {
        return this.prisma.recurringTask.findMany({
            where: { companyId },
            // include: {
            //     generatedDaily: true,
            // },
        });
    }

    async findByUserId(userId: string) {
        return this.prisma.recurringTask.findMany({
            where: { userId },
            // include: {
            //     generatedDaily: true,
            // },
        });
    }

    async update(id: string, data: any) {
        return this.prisma.recurringTask.update({
            where: { id },
            data,
        });
    }

    async remove(id: string) {
        return this.prisma.recurringTask.delete({
            where: { id },
        });
    }
}