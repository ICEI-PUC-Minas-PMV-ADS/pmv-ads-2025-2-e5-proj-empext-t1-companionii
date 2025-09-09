# Guia de Testes

Este projeto inclui uma configuração abrangente de testes com Jest para testes unitários/integração e Cypress para testes E2E/componentes.

## 🧪 Stack de Testes

### Testes Unitários e de Integração

- **Jest** - Framework de testes
- **@testing-library/react** - Utilitários para testar componentes React
- **@testing-library/jest-dom** - Matchers customizados para Jest
- **@testing-library/user-event** - Simulação de interações do usuário

### Testes End-to-End

- **Cypress** - Framework de testes E2E
- **@cypress/react** - Testes de componentes React
- **@cypress/vite-dev-server** - Integração com Vite

## 📜 Scripts Disponíveis

### Jest (Testes Unitários)

```bash
npm test                    # Executa todos os testes uma vez
npm run test:watch         # Executa testes em modo watch (observando mudanças)
npm run test:coverage      # Executa testes com relatório de cobertura
npm run test:ci            # Executa testes em modo CI
```

### Cypress (Testes E2E)

```bash
npm run cypress            # Abre a interface gráfica do Cypress
npm run cypress:headless   # Executa testes E2E sem interface gráfica
npm run test:e2e          # Executa testes E2E com servidor de desenvolvimento

# Testes de Componente
npm run cypress:component           # Abre interface gráfica para testes de componente
npm run cypress:component-headless  # Executa testes de componente sem interface gráfica
```

### Executar Todos os Testes

```bash
npm run test:all          # Executa tanto Jest quanto Cypress
```

## 📁 Estrutura de Testes

```
src/
├── __tests__/                 # Testes em nível de aplicação
│   └── App.test.jsx
├── components/
│   ├── __tests__/            # Testes unitários de componentes
│   │   └── DesignSystemDemo.test.jsx
│   └── DesignSystemDemo.cy.jsx  # Testes Cypress de componentes
├── __mocks__/                # Arquivos mock
│   └── fileMock.js
└── setupTests.js             # Configuração de setup dos testes

cypress/
├── e2e/                      # Testes end-to-end
│   └── design-system.cy.js
├── support/                  # Arquivos de suporte
│   ├── commands.js          # Comandos customizados
│   ├── component.js         # Setup para testes de componente
│   └── e2e.js              # Setup para E2E
└── fixtures/                # Dados de teste
```

## 🔧 Arquivos de Configuração

- **`jest.config.js`** - Configuração do Jest
- **`cypress.config.js`** - Configuração do Cypress
- **`src/setupTests.js`** - Arquivo de setup do Jest

## 🎯 Diretrizes de Testes

### Testes Unitários (Jest)

- Testar renderização de componentes e props
- Testar interações do usuário
- Testar lógica de negócio
- Mockar dependências externas
- Buscar >70% de cobertura de código

### Testes de Integração (Jest)

- Testar integração entre componentes
- Testar fluxo de dados entre componentes
- Testar submissões de formulário
- Testar roteamento

### Testes E2E (Cypress)

- Testar fluxos completos do usuário
- Testar em diferentes dispositivos/viewports
- Testar interações reais do navegador
- Testar com requisições de rede reais

### Testes de Componente (Cypress)

- Testar componentes isoladamente
- Testar regressão visual
- Testar interações complexas do usuário
- Servir como ponte entre testes unitários e E2E

## 📊 Relatórios de Cobertura

Relatórios de cobertura são gerados no diretório `coverage/` ao executar:

```bash
npm run test:coverage
```

Abra `coverage/lcov-report/index.html` para visualizar relatórios detalhados de cobertura.

## 🛠 Utilitários de Teste Customizados

### Comandos do Cypress

Localizados em `cypress/support/commands.js`:

- `cy.getByTestId(testId)` - Buscar elemento por data-testid
- `cy.getByText(text)` - Buscar elemento por conteúdo de texto
- `cy.typeInInput(label, value)` - Digitar em input por label
- `cy.clickButton(buttonText)` - Clicar em botão por texto
- `cy.waitForVisible(selector)` - Aguardar visibilidade do elemento

### Setup do Jest

Localizado em `src/setupTests.js`:

- Matchers da biblioteca DOM testing
- Implementações mock para IntersectionObserver, ResizeObserver
- Mock do matchMedia para testes responsivos

## 🚀 Melhores Práticas

### Escrevendo Testes

1. **Siga o Padrão AAA**: Arrange (Preparar), Act (Agir), Assert (Verificar)
2. **Teste comportamento, não implementação**
3. **Use queries semânticas** (getByRole, getByLabelText)
4. **Escreva nomes de teste descritivos**
5. **Mantenha testes independentes** e isolados

### Organização de Testes

1. Agrupe testes relacionados em blocos `describe`
2. Use `beforeEach` para setup
3. Use `afterEach` para limpeza
4. Mantenha arquivos de teste próximos ao código fonte

### Performance

1. Faça mock de dependências pesadas
2. Use queries `screen` para melhor performance
3. Evite testar detalhes de implementação
4. Use data-testid com parcimônia

## 🔍 Depurando Testes

### Jest

```bash
# Executar arquivo de teste específico
npm test -- DesignSystemDemo.test.jsx

# Executar testes que correspondam ao padrão
npm test -- --testNamePattern="should render"

# Modo de debug
npm test -- --verbose --no-coverage
```

### Cypress

```bash
# Abrir teste específico na interface gráfica
npx cypress open --e2e --spec "cypress/e2e/design-system.cy.js"

# Executar com saída de debug
npx cypress run --spec "cypress/e2e/design-system.cy.js" --headed
```

## 🐛 Problemas Comuns

### Problemas do Jest

- **Módulo não encontrado**: Verifique `moduleNameMapper` em `jest.config.js`
- **Testes assíncronos falhando**: Use `await` com `userEvent` ou `waitFor`
- **Imports CSS falhando**: Verifique se `identity-obj-proxy` está configurado

### Problemas do Cypress

- **Elemento não encontrado**: Use `cy.get().should('exist')` para aguardar
- **Problemas de timing**: Use comandos apropriados do Cypress em vez de esperas arbitrárias
- **Base URL**: Certifique-se de que o servidor de desenvolvimento está rodando para testes E2E

## 📚 Recursos

- [Documentação do Jest](https://jestjs.io/docs/getting-started)
- [Documentação da Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Documentação do Cypress](https://docs.cypress.io/)
- [Melhores Práticas para Testes React](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 💡 Dicas Adicionais

### Escrevendo Bons Testes

- **Teste o que o usuário faz**: Foque nas interações e comportamentos que o usuário realmente experimentará
- **Seja específico nos assertions**: Use matchers que expressem claramente o que está sendo testado
- **Evite testes frágeis**: Não dependa de implementações internas que podem mudar
- **Mantenha testes simples**: Um teste deve verificar apenas uma coisa por vez

### Organização e Manutenção

- **Nomeação consistente**: Use convenções claras para nomear arquivos e testes
- **Documentação**: Comente testes complexos para explicar o que está sendo testado
- **Refatoração**: Mantenha testes limpos e atualizados conforme o código evolui
- **Dados de teste**: Use fixtures ou factories para dados de teste reutilizáveis

### Estratégias de Teste

- **Pirâmide de testes**: Mais testes unitários, alguns de integração, poucos E2E
- **Teste de contratos**: Verifique que componentes se comunicam corretamente
- **Teste de edge cases**: Inclua cenários de erro e casos extremos
- **Teste de acessibilidade**: Verifique se a aplicação é acessível
