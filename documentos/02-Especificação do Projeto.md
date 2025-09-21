# Especificações do Projeto

### Definição do Problema

Desenvolvedores que gerenciam múltiplos projetos enfrentam dificuldades para organizar tarefas diárias, manter visibilidade do que deve ser executado, gerar relatórios profissionais para clientes e gerenciar eficientemente tarefas recorrentes versus pontuais. A falta de uma ferramenta unificada resulta em perda de produtividade, dificuldade na prestação de contas e gestão fragmentada entre diferentes clientes.

### Solução Proposta

Sistema web híbrido kanban/diário com IA integrada que oferece organização temporal de tarefas, geração automática de relatórios profissionais e gestão inteligente de recorrências. A solução centraliza a gestão diária em uma interface visual intuitiva, automatiza processos repetitivos e fornece insights de produtividade.

---

## Usuário do Sistema

| **Tipo de Usuário**          | **Descrição**                                                       | **Responsabilidades**                                                                                                                                                              |
| ---------------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Desenvolvedor Freelancer** | Profissional autônomo que atende múltiplos clientes simultaneamente | Organizar tarefas diárias por cliente, controlar tempo trabalhado, gerar relatórios para prestação de contas, configurar tarefas recorrentes, acompanhar métricas de produtividade |

---

## Arquitetura e Tecnologias

Descreva brevemente a arquitetura definida para o projeto e as tecnologias a serem utilizadas. Sugere-se a criação de um diagrama de componentes da solução.

## Project Model Canvas

<img width="789" height="566" alt="Captura de tela 2025-08-31 214404" src="https://github.com/user-attachments/assets/87e67bfc-63d8-4b7e-983e-409d8d7eb9e5" />

PITCH
Uma plataforma web inteligente para desenvolvedores que unifica a gestão de tarefas, automatiza a criação de relatórios com IA e otimiza a prestação de contas a clientes, transformando a organização diária em produtividade profissional.

POR QUÊ?
JUSTIFICATIVAS
Desenvolvedores (freelancers/pequenas equipes) carecem de uma ferramenta centralizada para gerir múltiplos projetos e clientes, levando à perda de tempo com tarefas administrativas e falta de clareza na alocação de esforço.

OBJETIVO (SMART)
Desenvolver e implantar um MVP funcional em 16 semanas, permitindo ao usuário organizar seu dia em menos de 3 minutos e gerar relatórios profissionais por cliente em menos de 20 segundos.

BENEFÍCIOS

Aumento da produtividade e organização.

Profissionalização da prestação de contas aos clientes.

Redução do tempo gasto com tarefas administrativas.

Insights sobre a distribuição de tempo entre projetos.

O QUÊ?
PRODUTO
Um sistema web responsivo (foco em desktop) que funciona como um assistente pessoal para a organização do trabalho, combinando um kanban temporal com a automação de um assistente de IA para otimizar o fluxo de trabalho diário.

REQUISITOS

Dashboard Kanban Diário (Futuro, Hoje, Passado).

Gerenciador de Tarefas Recorrentes.

Assistente de IA para resumos automáticos.

Gerador de Relatórios em PDF.

Sistema de Labels por Empresa/Cliente.

Dashboard de Métricas de Produtividade.

QUEM?
STAKEHOLDERS

Usuários Finais: Desenvolvedores (Freelancers, equipes pequenas).

Clientes dos Usuários: Empresas que recebem os relatórios.

Equipe de Projeto: Os responsáveis pelo desenvolvimento.

EQUIPE

Enzo

William

Leonardo

Adriana

Aaron

COMO?
PREMISSAS

A equipe domina a stack tecnológica (React, Node.js, Prisma).

As APIs de terceiros (IA, GitHub) funcionarão conforme o esperado e seus planos gratuitos serão suficientes.

A metodologia de sprints de 2 semanas será eficaz.

GRUPO DE ENTREGAS

Semanas 1-4: Estrutura base e Kanban funcional.

Semanas 5-8: Implementação do timer, tarefas recorrentes e IA.

Semanas 9-12: Construção de métricas, relatórios em PDF e integrações.

Semanas 13-16: Testes finais, documentação e deploy.

RESTRIÇÕES

Prazo: Entrega do MVP em 16 semanas.

Escopo: Foco estrito nas funcionalidades do MVP; novas ideias serão documentadas para versões futuras.

Custo: Orçamento zero; utilizar apenas ferramentas e serviços com planos gratuitos.

QUANDO e QUANTO?
RISCOS

Técnicos: Complexidade na implementação de jobs agendados (cron job).

Externos: Instabilidade ou mudança nos limites das APIs de terceiros.

Escopo: Tendência de adicionar funcionalidades não planejadas (scope creep).

LINHA DO TEMPO
O projeto seguirá o roadmap de 16 semanas, dividido em 4 sprints de entregas quinzenais, culminando na implantação do sistema na semana 16.

CUSTOS

Desenvolvimento: R$ 0,00 (horas de trabalho da equipe).

Ferramentas: R$ 0,00 (uso de planos gratuitos para APIs, hospedagem e banco de dados).

Total Estimado: R$ 0,00.

## Requisitos

**Técnica de priorização adotada: MoSCoW**

- **Must (ALTA)**: imprescindível ao MVP e diretamente ligado aos critérios de sucesso (kanban Futuro|Hoje|Passado; recorrentes; resumos IA; relatórios por empresa; timer/horas).
- **Should (MÉDIA)**: eleva valor e usabilidade (templates de relatório; filtros/identidade visual por label).
- **Could (BAIXA)**: diferencia, mas não bloqueia MVP (integrações externas, métricas avançadas).

### Requisitos Funcionais

| ID     | Descrição do Requisito                                                                        | Prioridade |
| ------ | --------------------------------------------------------------------------------------------- | ---------- |
| RF-001 | Autenticação/Autorização com papéis (Proprietário, Admin, Colaborador, Cliente).              | ALTA       |
| RF-002 | CRUD de Empresas/Labels com cor/identidade visual.                                            | ALTA       |
| RF-003 | CRUD de Tarefas Diárias (título, empresa, estimativa, descrição).                             | ALTA       |
| RF-004 | Kanban com colunas A Fazer \| Revisão \| Em Progresso \| Concluído e suporte a drag-and-drop. | ALTA       |
| RF-005 | Assistente IA: gerar resumos profissionais das tarefas concluídas no período.                 | ALTA       |
| RF-006 | Geração de relatórios por empresa/label (período selecionável).                               | ALTA       |
| RF-007 | Exportação em PDF dos relatórios com layout profissional.                                     | ALTA       |
| RF-008 | Templates de relatório por empresa (branding e seções padrão).                                | MÉDIA      |
| RF-009 | Filtros/visões por empresa/label e por status.                                                | MÉDIA      |
| RF-010 | Dashboard de métricas: tempo por empresa/tipo de tarefa, histórico semanal/mensal.            | MÉDIA      |
| RF-011 | Histórico/auditoria de alterações de tarefa e tempo.                                          | MÉDIA      |
| RF-012 | Integração GitHub: sincronizar commits/PRs como atividades.                                   | BAIXA      |
| RF-013 | Integração Trello: importar cards como tarefas.                                               | BAIXA      |
| RF-014 | Compartilhamento seguro de relatórios (link expira e/ou PDF).                                 | BAIXA      |

### Requisitos não Funcionais

| ID      | Descrição do Requisito                                                      | Prioridade |
| ------- | --------------------------------------------------------------------------- | ---------- |
| RNF-001 | Responsivo (desktop prioritário; uso confortável no mobile).                | ALTA       |
| RNF-002 | Desempenho: carregar dashboard em <3s; operações CRUD <1s.                  | ALTA       |
| RNF-003 | Relatórios gerados em <10s; processamento de IA <15s.                       | ALTA       |
| RNF-004 | APIs RESTful; banco normalizado com relacionamentos corretos.               | ALTA       |
| RNF-005 | Segurança: autenticação, RBAC, proteção a injeção/CSRF/XSS, logs.           | ALTA       |
| RNF-006 | Privacidade: relatórios segmentados por empresa; compartilhamento restrito. | ALTA       |
| RNF-007 | Auditoria: timestamps e trilhas de alterações de tempo/tarefa.              | MÉDIA      |
| RNF-008 | Exportação de dados (PDF) garantida para portabilidade.                     | MÉDIA      |
| RNF-009 | Observabilidade: métricas e logs mínimos para diagnósticos.                 | MÉDIA      |
| RNF-010 | Acessibilidade: contraste/teclado/aria nas telas principais.                | MÉDIA      |
| RNF-011 | Compatibilidade: Chrome/Firefox/Edge recentes.                              | BAIXA      |

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

| ID  | Restrição                                                                                                                                                                               |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 01  | Prazo acadêmico: entregar MVP funcional até o fim do semestre.                                                                                                                          |
| 02  | Escopo do MVP focado em: kanban temporal, recorrentes, timer, IA de resumos e relatório PDF por empresa. Integrações externas (GitHub/Trello/deploy) são Could (não bloqueiam entrega). |
| 03  | Time de 6 pessoas, sem terceirização. Divisão por trilhas acima.                                                                                                                        |
| 04  | Stack de referência (para manter consistência entre entregas): Frontend React; Backend Node.js/NestJS; SQL + Prisma; API de IA externa com prompt interno fixo.                         |
| 05  | Custo zero/low-cost: uso de tiers gratuitos e serviços gerenciados mínimos; sem dados sensíveis de produção.                                                                            |

## Diagrama de Caso de Uso

![Diagrama de Caso de Uso](img/diagrama.png)

> **Links Úteis**:
>
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

## Arquitetura da Solução

A seguir, descreve-se a estrutura do software, detalhando os componentes que formam a solução e o ambiente onde a aplicação será hospedada.

A arquitetura adotada é baseada em uma plataforma em nuvem, que integra múltiplas camadas para suportar aplicações tanto para web quanto para dispositivos móveis. Essa arquitetura é modular e escalável, sendo projetada para ambientes distribuídos. Ela divide as responsabilidades entre as diversas camadas e se aproveita de serviços gerenciados para garantir alta disponibilidade, segurança robusta e facilidade de manutenção.

Em termos gerais, a arquitetura é organizada nas seguintes camadas:

- _Frontend/Clientes:_ A camada responsável pela interação com o usuário, acessada por meio de navegadores ou aplicativos móveis.

- _Backend:_ Onde ocorrem o processamento das lógicas de negócio, a gestão dos dados e a integração com sistemas externos.

- _Banco de Dados (SQL):_ Armazena os dados estruturados da aplicação, assegurando integridade e alta performance nas consultas realizadas.

![Arquitetura da Solução](./img/ArquiteturaInicial.png)

## Modelo da Base de Dados

# Para banco de dados relacional:

# Sistema de Gestão Diária para Desenvolvedores

## Documentação da Base de Dados

---

## 1. Modelo Entidade-Relacionamento (MER)

```mermaid
erDiagram
    USERS {
        int user_id PK
        string name
        string email
        string password_hash
        datetime created_at
        datetime updated_at
    }

    COMPANIES {
        int company_id PK
        int user_id FK
        string name
        string color_hex
        string description
        datetime created_at
        datetime updated_at
    }


    DAILY_TASKS {
        int daily_task_id PK
        int user_id FK
        int company_id FK
        string title
        string description
        string status
        date task_date
        int estimated_minutes
        int actual_minutes
        datetime started_at
        datetime completed_at
        datetime created_at
        datetime updated_at
    }

    REPORTS {
        int report_id PK
        int user_id FK
        int company_id FK
        string title
        text ai_summary
        date period_start
        date period_end
        int total_tasks
        int total_minutes
        string pdf_path
        datetime generated_at
        datetime created_at
    }

    TIME_LOGS {
        int time_log_id PK
        int daily_task_id FK
        datetime start_time
        datetime end_time
        int duration_minutes
        string notes
        datetime created_at
    }

    INTEGRATIONS {
        int integration_id PK
        int user_id FK
        int company_id FK
        string integration_type
        string external_id
        string config_data
        boolean is_active
        datetime last_sync_at
        datetime created_at
        datetime updated_at
    }

    USERS ||--o{ COMPANIES : owns
    USERS ||--o{ DAILY_TASKS : manages
    USERS ||--o{ REPORTS : generates
    USERS ||--o{ INTEGRATIONS : configures

    COMPANIES ||--o{ DAILY_TASKS : categorizes
    COMPANIES ||--o{ REPORTS : segments
    COMPANIES ||--o{ INTEGRATIONS : connects

    DAILY_TASKS ||--o{ TIME_LOGS : tracks
```

---

## 2. Projeto Físico da Base de Dados

### 2.1 Tabela USERS

```sql
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(320) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

**Descrição:** Armazena informações dos desenvolvedores que utilizam o sistema.

**Campos:**

- `user_id`: Chave primária, identificador único do usuário
- `name`: Nome completo do usuário
- `email`: Email único para autenticação
- `password_hash`: Hash da senha para segurança
- `created_at`: Data de criação do registro
- `updated_at`: Data da última atualização

### 2.2 Tabela COMPANIES

```sql
CREATE TABLE companies (
    company_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    color_hex VARCHAR(7) NOT NULL DEFAULT '#3498db',
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_companies_user_id ON companies(user_id);
```

**Descrição:** Empresas/clientes dos desenvolvedores com identidade visual.

**Campos:**

- `company_id`: Chave primária, identificador único da empresa
- `user_id`: Chave estrangeira para users
- `name`: Nome da empresa/cliente
- `color_hex`: Cor em hexadecimal para labels visuais
- `description`: Descrição opcional da empresa
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

### 2.4 Tabela DAILY_TASKS

```sql
CREATE TABLE daily_tasks (
    daily_task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    company_id INTEGER,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('future', 'today', 'in_progress', 'completed', 'past') DEFAULT 'future',
    task_date DATE NOT NULL,
    estimated_minutes INTEGER DEFAULT 30,
    actual_minutes INTEGER DEFAULT 0,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL,
);

CREATE INDEX idx_daily_tasks_user_id ON daily_tasks(user_id);
CREATE INDEX idx_daily_tasks_company_id ON daily_tasks(company_id);
CREATE INDEX idx_daily_tasks_task_date ON daily_tasks(task_date);
CREATE INDEX idx_daily_tasks_status ON daily_tasks(status);
```

**Descrição:** Tarefas específicas organizadas no kanban temporal (Futuro | Hoje | Passado).

**Campos:**

- `daily_task_id`: Chave primária
- `user_id`: Chave estrangeira para users
- `company_id`: Chave estrangeira para companies
- `title`: Título da tarefa
- `description`: Descrição detalhada
- `status`: Status atual (future, today, in_progress, completed, past)
- `task_date`: Data da tarefa
- `estimated_minutes`: Tempo estimado em minutos
- `actual_minutes`: Tempo real gasto em minutos
- `started_at`: Timestamp de início da tarefa
- `completed_at`: Timestamp de conclusão
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

### 2.5 Tabela REPORTS

```sql
CREATE TABLE reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    company_id INTEGER,
    title VARCHAR(255) NOT NULL,
    ai_summary TEXT,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_tasks INTEGER DEFAULT 0,
    total_minutes INTEGER DEFAULT 0,
    pdf_path VARCHAR(500),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_company_id ON reports(company_id);
CREATE INDEX idx_reports_period ON reports(period_start, period_end);
```

**Descrição:** Relatórios gerados automaticamente com resumos da IA por período e empresa.

**Campos:**

- `report_id`: Chave primária
- `user_id`: Chave estrangeira para users
- `company_id`: Chave estrangeira para companies (filtro por empresa)
- `title`: Título do relatório
- `ai_summary`: Resumo gerado pela IA das atividades
- `period_start`: Data de início do período
- `period_end`: Data de fim do período
- `total_tasks`: Total de tarefas no período
- `total_minutes`: Total de minutos trabalhados
- `pdf_path`: Caminho para o arquivo PDF exportado
- `generated_at`: Timestamp de geração do relatório
- `created_at`: Data de criação

### 2.6 Tabela TIME_LOGS

```sql
CREATE TABLE time_logs (
    time_log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    daily_task_id INTEGER NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    duration_minutes INTEGER,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (daily_task_id) REFERENCES daily_tasks(daily_task_id) ON DELETE CASCADE
);

CREATE INDEX idx_time_logs_daily_task_id ON time_logs(daily_task_id);
CREATE INDEX idx_time_logs_start_time ON time_logs(start_time);
```

**Descrição:** Registros detalhados de tempo por tarefa com timer integrado.

**Campos:**

- `time_log_id`: Chave primária
- `daily_task_id`: Chave estrangeira para daily_tasks
- `start_time`: Timestamp de início do timer
- `end_time`: Timestamp de fim do timer
- `duration_minutes`: Duração calculada em minutos
- `notes`: Notas adicionais sobre o período trabalhado
- `created_at`: Data de criação

### 2.7 Tabela INTEGRATIONS

```sql
CREATE TABLE integrations (
    integration_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    company_id INTEGER,
    integration_type ENUM('github', 'trello', 'render', 'netlify') NOT NULL,
    external_id VARCHAR(255),
    config_data JSON,
    is_active BOOLEAN DEFAULT TRUE,
    last_sync_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE SET NULL
);

CREATE INDEX idx_integrations_user_id ON integrations(user_id);
CREATE INDEX idx_integrations_company_id ON integrations(company_id);
CREATE INDEX idx_integrations_type ON integrations(integration_type);
```

**Descrição:** Configurações de integrações externas (GitHub, Trello, Deploy platforms).

**Campos:**

- `integration_id`: Chave primária
- `user_id`: Chave estrangeira para users
- `company_id`: Chave estrangeira para companies (opcional)
- `integration_type`: Tipo de integração (github, trello, render, netlify)
- `external_id`: ID externo da integração
- `config_data`: Configurações em JSON (tokens, webhooks, etc.)
- `is_active`: Flag para ativar/desativar integração
- `last_sync_at`: Timestamp da última sincronização
- `created_at`: Data de criação
- `updated_at`: Data da última atualização

---

## 3. Relacionamentos e Integridade Referencial

### 3.1 Relacionamentos Principais

- **users → companies**: Um usuário pode ter várias empresas (1:N)
- **users → daily_tasks**: Um usuário pode ter várias tarefas diárias (1:N)
- **companies → daily_tasks**: Uma empresa pode ter várias tarefas diárias (1:N)
- **daily_tasks → time_logs**: Uma tarefa diária pode ter vários logs de tempo (1:N)

### 3.2 Constraints de Integridade

- **CASCADE**: Exclusão de usuário remove todas as suas empresas, tarefas e relatórios
- **SET NULL**: Exclusão de empresa mantém tarefas mas remove a referência
- **UNIQUE**: Email do usuário deve ser único no sistema
- **NOT NULL**: Campos obrigatórios para funcionamento do sistema

---

## 4. Índices para Performance

### 4.1 Índices de Busca Frequente

- `idx_users_email`: Busca rápida por email na autenticação
- `idx_daily_tasks_task_date`: Filtros por data no kanban
- `idx_daily_tasks_status`: Filtros por status (Futuro, Hoje, Passado)

### 4.2 Índices de Relacionamento

- `idx_companies_user_id`: Busca empresas por usuário
- `idx_daily_tasks_company_id`: Filtros por empresa nos relatórios
- `idx_time_logs_daily_task_id`: Cálculo de tempo por tarefa

---

## 5. Considerações Técnicas

### 5.1 Migração Automática às 00h

- Job scheduler atualiza `status` de 'today' para 'past' em `daily_tasks`
- Trigger automático para popular tarefas recorrentes em 'today'

### 5.2 Cálculo de Métricas

- Views materializadas para dashboard de produtividade
- Agregações de tempo por empresa e tipo de tarefa
- Histórico de produtividade semanal/mensal

### 5.3 Backup e Auditoria

- Campos `created_at` e `updated_at` em todas as tabelas
- Soft delete opcional via campo `deleted_at`
- Logs de alterações para auditoria completa
