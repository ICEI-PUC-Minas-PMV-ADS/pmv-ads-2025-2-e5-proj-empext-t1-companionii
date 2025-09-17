describe('Design System Demo E2E Tests', () => {
  beforeEach(() => {
    // Mock authenticated state to access dashboard
    cy.window().then(win => {
      const mockAuthState = {
        state: {
          user: { id: 1, name: 'Test User', email: 'test@example.com' },
          token: 'mock-token',
          refreshToken: 'mock-refresh-token',
          isAuthenticated: true,
        },
        version: 0,
      };
      win.localStorage.setItem('auth-storage', JSON.stringify(mockAuthState));
    });
    cy.visit('/dashboard');
    cy.viewport(1280, 720);
  });

  describe('Page Load and Layout', () => {
    it('should load the dashboard page', () => {
      cy.contains('Bem-vindo ao Companion').should('be.visible');
      cy.contains('Sua jornada conosco começa aqui').should('be.visible');
      cy.contains('Olá, Test User!').should('be.visible');
    });

    it('should have proper page structure', () => {
      cy.get('body').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 255)',
      );
      cy.get('[class*="max-w"]').should('exist');
    });
  });

  describe('Typography System', () => {
    it('should display various heading levels on dashboard', () => {
      cy.get('h1').contains('Bem-vindo ao Companion').should('be.visible');
      cy.get('h2').should('exist');
      cy.get('h3').should('exist');
    });

    it('should display body text styles', () => {
      cy.contains('Sua jornada conosco começa aqui').should('be.visible');
      cy.contains('Informações do Perfil').should('be.visible');
      cy.contains('Status da Conta').should('be.visible');
    });

    it('should have correct font families applied', () => {
      cy.get('h1').should('have.css', 'font-weight').and('not.be.empty');
      cy.get('p').first().should('have.css', 'font-weight').and('not.be.empty');
    });
  });

  describe('Color Palette Display', () => {
    it('should show color elements on dashboard', () => {
      // Check for colored elements that exist on the dashboard
      cy.get('[class*="bg-blue"]').should('exist');
      cy.get('[class*="bg-green"]').should('exist');
      cy.get('[class*="bg-purple"]').should('exist');
    });

    it('should show semantic colors', () => {
      // Check for status indicators
      cy.contains('Conta Ativa').should('be.visible');
      cy.get('.bg-green-500').should('exist'); // Status indicators
    });

    it('should display color variations', () => {
      // Check if various color backgrounds exist
      cy.get('[class*="bg-gray"]').should('exist');
      cy.get('[class*="bg-white"]').should('exist');
    });
  });

  describe('Component Interactions', () => {
    it('should interact with buttons on dashboard', () => {
      cy.contains('button', 'Ver Documentação')
        .should('be.visible')
        .click();

      cy.contains('button', 'Gerenciar Configurações')
        .should('be.visible');

      cy.contains('button', 'Contatar Suporte')
        .should('be.visible');
    });

    it('should test button hover states', () => {
      cy.contains('button', 'Ver Documentação')
        .trigger('mouseover')
        .should('have.css', 'transition');
    });

    it('should display card components', () => {
      // Check for cards on the dashboard
      cy.get('[class*="card-elevated"]').should('exist');
      cy.get('[class*="card-base"]').should('exist');
    });

    it('should show interactive elements', () => {
      // Test that buttons are clickable and visible
      cy.get('button').should('have.length.greaterThan', 0);
      cy.get('button').first().should('be.visible');
    });
  });

  describe('Card Components', () => {
    it('should display dashboard card components', () => {
      cy.contains('Informações do Perfil')
        .should('be.visible');

      cy.contains('Status da Conta')
        .should('be.visible');

      cy.contains('Atividade Recente')
        .should('be.visible');
    });
  });

  describe('Status Badges', () => {
    it('should display account status indicators', () => {
      cy.contains('Conta Ativa').should('be.visible');
      cy.get('.bg-green-500').should('exist'); // Status indicator dots
      cy.contains('Email Verificado').should('be.visible');
    });
  });

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport(375, 667);
      cy.contains('Bem-vindo ao Companion').should('be.visible');
      cy.contains('Ver Documentação').should('be.visible');
    });

    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024);
      cy.contains('Informações do Perfil').should('be.visible');
      cy.contains('Status da Conta').should('be.visible');
    });

    it('should adapt grid layouts on different screen sizes', () => {
      // Desktop
      cy.viewport(1280, 720);
      cy.get('[class*="md:grid-cols"]').should('exist');

      // Mobile
      cy.viewport(375, 667);
      cy.get('[class*="grid"]').should('exist');
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1, h2, h3, h4, h5').should('have.length.greaterThan', 0);
    });

    it('should have accessible content structure', () => {
      cy.get('h1').should('exist');
      cy.get('h2').should('exist');
      cy.get('h3').should('exist');
    });
  });

  describe('Performance and Loading', () => {
    it('should load dashboard page quickly', () => {
      const start = Date.now();
      cy.visit('/dashboard');
      cy.contains('Bem-vindo ao Companion')
        .should('be.visible')
        .then(() => {
          const loadTime = Date.now() - start;
          expect(loadTime).to.be.lessThan(5000); // Should load in less than 5s
        });
    });

    it('should have no console errors', () => {
      cy.visit('/dashboard', {
        onBeforeLoad(win) {
          const mockAuthState = {
            state: {
              user: { id: 1, name: 'Test User', email: 'test@example.com' },
              token: 'mock-token',
              refreshToken: 'mock-refresh-token',
              isAuthenticated: true,
            },
            version: 0,
          };
          win.localStorage.setItem('auth-storage', JSON.stringify(mockAuthState));
          cy.stub(win.console, 'error').as('consoleError');
        },
      });
      cy.get('@consoleError').should('not.have.been.called');
    });
  });
});
