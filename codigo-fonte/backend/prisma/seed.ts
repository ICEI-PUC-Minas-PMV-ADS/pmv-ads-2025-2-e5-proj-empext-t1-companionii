import { PrismaClient, Role, TaskStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL as string;
  const adminPass = process.env.ADMIN_PASSWORD as string;

  const passwordHash = await bcrypt.hash(adminPass, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: 'Admin',
      email: adminEmail,
      passwordHash,
      role: Role.ADMIN,
    },
  });

  const company = await prisma.company.create({
    data: {
      ownerId: admin.id,
      name: 'Empresa Exemplo',
      colorHex: '#8e44ad',
      description: 'Cliente de demonstração',
    },
  });

  await prisma.dailyTask.create({
    data: {
      userId: admin.id,
      companyId: company.id,
      title: 'Configurar ambiente',
      description: 'Preparar repositório e CI/CD',
      status: TaskStatus.TODAY,
      taskDate: new Date(),
      estimatedMin: 60,
    },
  });

  console.log('✅ Seed concluído:', {
    admin: admin.email,
    company: company.name,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
