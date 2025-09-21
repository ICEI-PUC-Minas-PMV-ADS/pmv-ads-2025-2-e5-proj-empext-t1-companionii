# Companion - Projeto de Interface

## Links do Projeto

### Design Files

- **Figma Design:** [Sistema Kanban Híbrido](https://www.figma.com/design/uJWCiBKyIEy04oaIVkSmN5/Grupo-Puc?node-id=706-1400&t=VeZthGZyx2Om9z5Q-1)
- **Protótipo Interativo:** [Navegação Completa](https://www.figma.com/proto/uJWCiBKyIEy04oaIVkSmN5/Grupo-Puc?page-id=47%3A2&node-id=706-1400&viewport=-1734%2C-627%2C0.16&t=HGQZs1VOrge0dDlu-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=706%3A1400)

## Visão Geral do Design System

### Paleta de Cores

#### Cores Primárias

- **Primary:** `#111111` - Preto principal para textos e elementos de destaque
- **Primary Dark:** `#000000` - Preto absoluto para contraste máximo
- **Primary Light:** `#404040` - Cinza escuro para elementos secundários
- **White:** `#FFFFFF` - Branco para fundos e textos em elementos escuros
- **Secondary:** `#808080` - Cinza médio para textos auxiliares

#### Cores Semânticas

- **Success:** `#22C55E` - Verde para ações de sucesso e confirmação
- **Coral:** `#EF4444` - Vermelho para alertas e ações destrutivas
- **Warning:** `#F59E0B` - Laranja para avisos e estados intermediários
- **Social:** `#3B82F6` - Azul para ações sociais e links

#### Cores Neutras

- **Gray 50:** `#F9FAFB` - Cinza muito claro para fundos sutis
- **Gray 100:** `#F3F4F6` - Cinza claro para separadores
- **Gray 200:** `#E5E7EB` - Cinza médio-claro para bordas
- **Gray 300:** `#D1D5DB` - Cinza médio para elementos desabilitados
- **Gray 400:** `#9CA3AF` - Cinza escuro para textos secundários
- **Gray 900:** `#111827` - Cinza muito escuro alternativo

### Tipografia

#### Família de Fontes

- **Primary Font:** Geist (Sans-serif)
- **Fallbacks:** Geist, -apple-system, Roboto, Helvetica, sans-serif

#### Hierarquia de Títulos

- **Heading 1:** 48px / 700 / 56px line-height
- **Heading 2:** 36px / 700 / 44px line-height
- **Heading 3:** 32px / 600 / 40px line-height
- **Heading 4:** 24px / 600 / 32px line-height
- **Heading 5:** 20px / 600 / 28px line-height

#### Texto Corpo

- **Body Large:** 18px / 400 / 28px line-height
- **Body Medium:** 16px / 400 / 24px line-height
- **Body Small:** 14px / 400 / 20px line-height

### Espaçamento

Sistema de espaçamento consistente baseado em múltiplos de 4px:

- **Spacing 1:** 8px
- **Spacing 2:** 16px
- **Spacing 3:** 24px

## Estrutura das Interfaces

### 1. Sistema de Autenticação

#### 1.1 Tela de Login

**Função:** Autenticação de usuários existentes no sistema

**Elementos Principais:**

- Logo/ícone do sistema centralizado
- Título: "Sistema Kanban Híbrido"
- Subtítulo: "Gerencie tarefas e projetos com AI integrada"
- Indicadores visuais dos três pilares (ícones coloridos)
- Formulário de login com campos:
  - Email (obrigatório)
  - Senha (obrigatório)
- Botão primário "Acessar sua conta"
- Link para "Criar conta"

**Estados de Interação:**

- Campos em foco com destaque visual
- Validação em tempo real
- Loading state no botão durante autenticação
- Tratamento de erros com mensagens claras

#### 1.2 Tela de Registro

**Função:** Criação de novas contas de usuário

**Elementos Principais:**

- Logo/ícone centralizado
- Título: "Gerenciamento Inteligente"
- Subtítulo: "Sistema completo para gestão de tarefas e projetos com inteligência artificial integrada"
- Formulário completo com campos:
  - Nome completo (obrigatório)
  - Email (obrigatório)
  - Empresa/Organização (opcional)
  - Nome da sua empresa (opcional)
  - Senha (obrigatório)
  - Confirmar senha (obrigatório)
- Checkbox de aceite dos termos
- Botão "Criar Conta"
- Link para voltar ao login

**Validações:**

- Email único no sistema
- Senha forte (mínimo 8 caracteres)
- Confirmação de senha idêntica
- Aceite obrigatório dos termos

#### 1.3 Esqueci a Senha

**Função:** Recuperação de acesso via email

**Elementos Principais:**

- Logo/ícone centralizado
- Título: "Sistema Kanban Híbrido"
- Texto explicativo sobre recuperação
- Campo único: Email
- Botão "Enviar"
- Link para voltar ao login

**Fluxo:**

- Usuário insere email
- Sistema envia token de recuperação
- Redirecionamento para tela de login com confirmação

### 2. Dashboard Principal

#### 2.1 Visão Geral

**Função:** Painel central com métricas e acesso rápido

**Layout:**

- Header com título "Dashboard", breadcrumb e perfil do usuário
- Cards de métricas principais:
  - Projetos Ativos (contador)
  - Tarefas Hoje (contador)
  - Horas Hoje (contador)
- Seção "Tarefas de Hoje" com lista de tarefas prioritárias
- Botão "Nova Tarefa" para criação rápida
- Seção "Próximas Ações" com timeline de atividades

**Elementos Interativos:**

- Cards clicáveis com hover states
- Botões de ação primários
- Lista de tarefas com status visual
- Timeline interativa

### 3. Gestão de Projetos

#### 3.1 Lista de Projetos

**Função:** Visão geral de todos os projetos

**Estrutura:**

- Header com título e botão "Novo Projeto"
- Tabela/grid com colunas:
  - Nome do Projeto
  - Empresa
  - Status
  - Data Conclusão
  - Progresso Visual
- Estados de projeto identificados por cores
- Área vazia com call-to-action quando não há projetos

#### 3.2 Modal Criar Projeto

**Função:** Formulário para criação de novos projetos

**Campos:**

- Nome do Projeto (obrigatório)
- Empresa (seleção)
- Descrição (opcional)
- Seletor de cores para identificação visual
- Botões "Cancelar" e "Criar Projeto"

**Seletor de Cores:**
Paleta com 16 opções de cores organizadas em grid 4x4

#### 3.3 Projeto Criado

**Função:** Confirmação visual da criação

**Elementos:**

- Lista atualizada com novo projeto
- Projeto destacado com cor selecionada
- Badge "Kanban de Reunião" como exemplo
- Status e métricas zeradas (0/0, 0.0h)

### 4. Sistema Kanban

#### 4.1 Board Principal

**Função:** Visualização e gestão de tarefas em colunas

**Estrutura:**

- Header com título "Kanban Board" e botão "Nova Tarefa"
- Três colunas principais:
  - **Futuro** (0 tarefas) - Tarefas planejadas
  - **Hoje** (1 tarefa) - Tarefas do dia atual
  - **Passado** (0 tarefas) - Tarefas concluídas/atrasadas
- Cards de tarefas com:
  - Título da tarefa
  - Tags de empresa (com cores)
  - Indicadores de tempo/progresso

#### 4.2 Modal Criar Tarefa

**Função:** Formulário detalhado para novas tarefas

**Campos:**

- Nova Tarefa (título obrigatório)
- Descrição detalhada
- Empresa (dropdown)
- Status (seleção)
- Data (date picker)
- Tempo Estimado (em horas)
- Tarefas Recorrente (checkbox)

**Botões:**

- "Cancelar" (secundário)
- "Criar Tarefa" (primário)

#### 4.3 Tarefa Criada

**Função:** Estado pós-criação da tarefa

**Visualização:**

- Card na coluna "Hoje"
- Badge verde "Preparar CVs"
- Status visual atualizado
- Contadores das colunas atualizados (Hoje: 1)

### 5. Relatórios IA

#### 5.1 Dashboard de Relatórios

**Função:** Análise e insights gerados por IA

**Seções:**

- **Fatos da Semana:**
  - Distribuição de Produtividade (gráfico)
  - Insights sobre padrões de trabalho
- **Insights de IA:**
  - Texto gerado automaticamente
  - Recomendações personalizadas
  - Análise de tendências
- **Métricas Rápidas:**
  - Produtividade (0.0%)
  - Progresso (100.0%)
  - Dias Produtivos (0)
  - Intervalos (0)

**Ações:**

- "Exportar dados" (botão secundário)
- "Gerar relatório" (botão primário)

## Padrões de Interação

### Estados de Componentes

- **Default:** Estado padrão sem interação
- **Hover:** Elevação sutil e mudança de cor
- **Active:** Feedback visual de clique/toque
- **Disabled:** Opacidade reduzida e cursor não permitido
- **Loading:** Spinner ou skeleton loading

### Feedback Visual

- **Sucesso:** Toast verde com ícone de check
- **Erro:** Toast vermelho com ícone de alerta
- **Informação:** Toast azul com ícone informativo
- **Loading:** Indicadores de carregamento contextuais

### Navegação

- **Breadcrumbs:** Navegação hierárquica clara
- **Menu Principal:** Acesso às funcionalidades core
- **Ações Rápidas:** Botões flutuantes quando aplicável

## Responsividade

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### Adaptações Mobile

- Menu colapsível em hamburger
- Cards em coluna única
- Formulários com campos full-width
- Botões adaptados para touch

### Adaptações Tablet

- Layout híbrido com sidebar colapsível
- Kanban com scroll horizontal
- Modais adaptados ao viewport

## Acessibilidade

### Diretrizes WCAG 2.1

- Contraste mínimo 4.5:1 para textos
- Foco visível em todos os elementos interativos
- Labels apropriados para screen readers
- Navegação por teclado completa

### Tecnologias Assistivas

- ARIA labels para componentes complexos
- Landmarks semânticos (nav, main, aside)
- Anúncios de mudanças de estado
- Suporte a zoom até 200%

## Implementação Técnica

### Stack Tecnológico

- **Framework:** React com hooks
- **Styling:** TailwindCSS + DaisyUI
- **Ícones:** Lucide React ou similares
- **Animações:** CSS transitions + Framer Motion
- **Formulários:** React Hook Form com validação

### Componentes Base

- Button (primário, secundário, ghost)
- Input (text, email, password, select)
- Modal/Dialog
- Toast/Notification
- Card
- Badge/Tag
- Progress Bar

_Documentação criada com base no design system e protótipos do projeto Companion_
_Última atualização: Setembro 2025_
