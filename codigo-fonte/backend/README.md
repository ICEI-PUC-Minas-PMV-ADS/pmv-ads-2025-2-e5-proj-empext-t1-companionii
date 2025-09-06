# Companion — Backend (NestJS + Prisma + PostgreSQL)

Backend com autenticação JWT, Swagger, seeds e Docker.

## Requisitos

- Node.js 22+
- Docker e Docker Compose

## Configuração

1. Copie `.env.example` para `.env` e ajuste se necessário.
2. Instale deps:

   ```bash
   npm ci
   ```

3. Suba o Postgres e a API:
   ```bash
   docker compose up -d --build
   ```
4. Rode as migrações e seed (se estiver rodando local fora do container):

   ```bash
   npx prisma migrate dev
   npm run seed
   ```

5. Acesse a API e docs:
   - API: [http://localhost:3000](http://localhost:3000)
   - Swagger: [http://localhost:3000/docs](http://localhost:3000/docs)

### Login admin

- email: `${ADMIN_EMAIL}` (default: `admin@local.com`)
- senha: `${ADMIN_PASSWORD}` (default: `admin123`)

## Scripts úteis

```bash
npm run prisma:generate
npm run prisma:migrate
npm run seed
npm run start:dev
```

## Roadmap (MVP)

- [x] Auth JWT + RBAC
- [x] CRUD básico Users
- [ ] DailyTasks base + Scheduler meia-noite
- [ ] RecurringTasks CRUD + autopopular em TODAY
- [ ] Relatórios (agregações e PDF)
- [ ] Integração IA para resumo de período
- [ ] Métricas

## Licença

MIT

---

## 🧩 Extras

- **Swagger** disponível em `/docs` com BearerAuth configurado
- **RBAC** via decorator `@Roles()` e `RolesGuard`
- **Seed** cria usuário admin, empresa e exemplos de tarefas
