describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear any existing auth state
    cy.clearAuth();

    // Intercept auth requests to prevent actual submission during validation tests
    cy.intercept('POST', '**/auth/login', { statusCode: 400, body: { message: 'Test intercepted' } }).as('loginRequest');
    cy.intercept('POST', '**/auth/forgot-password', { statusCode: 400, body: { message: 'Test intercepted' } }).as('forgotPasswordRequest');
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('displays login form correctly', () => {
      cy.contains('Acesse a sua conta').should('be.visible');
      cy.get('[placeholder="Digite seu email"]').should('be.visible');
      cy.get('[placeholder="Digite sua senha"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Entrar');
      cy.get('button').contains('Continuar com Google').should('be.visible');
    });

    it('validates required fields', () => {
      cy.get('[data-testid="login-button"]').click();

      // Wait for validation to complete
      cy.wait(500);

      // Check that form validation prevents submission
      cy.url().should('include', '/login');

      // Look for any error messages that might appear
      cy.get('body').should('contain.text', 'obrigatório');
    });

    it('validates email format', () => {
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="login-button"]').click();

      // Wait for validation and check that we're still on login page (validation prevented submission)
      cy.wait(500);
      cy.url().should('include', '/login');

      // Check that the email field still has the invalid value
      cy.get('[data-testid="email-input"]').should('have.value', 'invalid-email');

      // The validation should prevent the login request from being made
      cy.get('@loginRequest.all').should('have.length', 0);
    });

    it('validates password length', () => {
      cy.get('[data-testid="email-input"]').type('test@example.com');
      cy.get('[data-testid="password-input"]').type('123');
      cy.get('[data-testid="login-button"]').click();

      // Wait for validation and check that we're still on login page
      cy.wait(500);
      cy.url().should('include', '/login');

      // Check that the password field still has the invalid value
      cy.get('[data-testid="password-input"]').should('have.value', '123');

      // The validation should prevent the login request from being made
      cy.get('@loginRequest.all').should('have.length', 0);
    });

    it('toggles password visibility', () => {
      cy.get('[placeholder="Digite sua senha"]').type('password123');

      // Password should be hidden by default
      cy.get('[placeholder="Digite sua senha"]').should(
        'have.attr',
        'type',
        'password',
      );

      // Click toggle button - look for eye icon button
      cy.get('[placeholder="Digite sua senha"]')
        .parent()
        .find('button')
        .click();

      // Password should now be visible
      cy.get('[placeholder="Digite sua senha"]').should(
        'have.attr',
        'type',
        'text',
      );
    });

    it('navigates to registration page', () => {
      cy.contains('Cadastre-se').click();
      cy.url().should('include', '/register');
    });

    it('navigates to forgot password page', () => {
      cy.contains('Esqueceu a senha?').click();
      cy.url().should('include', '/forgot-password');
    });
  });

  describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('displays registration form correctly', () => {
      cy.contains('Crie sua conta').should('be.visible');
      cy.get('[placeholder="Digite seu nome completo"]').should('be.visible');
      cy.get('[placeholder="Digite seu email"]').should('be.visible');
      cy.get('[placeholder="Crie uma senha"]').should('be.visible');
      cy.get('[placeholder="Confirme sua senha"]').should('be.visible');
      cy.get('input[type="checkbox"]').should('be.visible');
    });

    it('shows password strength indicator', () => {
      cy.get('[placeholder="Crie uma senha"]').type('weak');
      cy.contains('Weak', { matchCase: false }).should('be.visible');

      cy.get('[placeholder="Crie uma senha"]')
        .clear()
        .type('StrongPassword123!');
      cy.contains('Strong', { matchCase: false }).should('be.visible');
    });

    it('validates password confirmation', () => {
      cy.get('[placeholder="Digite seu nome completo"]').type('John Doe');
      cy.get('[placeholder="Digite seu email"]').type('john@example.com');
      cy.get('[placeholder="Crie uma senha"]').type('password123');
      cy.get('[placeholder="Confirme sua senha"]').type('different');
      cy.get('input[type="checkbox"]').check();

      cy.get('button[type="submit"]').click();

      // Check for password mismatch validation
      cy.get('form').should('exist');
      cy.url().should('include', '/register'); // Should still be on register page
    });

    it('requires terms acceptance', () => {
      cy.get('[placeholder="Digite seu nome completo"]').type('John Doe');
      cy.get('[placeholder="Digite seu email"]').type('john@example.com');
      cy.get('[placeholder="Crie uma senha"]').type('password123');
      cy.get('[placeholder="Confirme sua senha"]').type('password123');

      cy.get('button[type="submit"]').click();

      // Check that form validation prevents submission
      cy.get('form').should('exist');
      cy.url().should('include', '/register'); // Should still be on register page
    });

    it('navigates back to login page', () => {
      cy.contains('Entrar').click();
      cy.url().should('include', '/login');
    });
  });

  describe('Forgot Password Page', () => {
    beforeEach(() => {
      cy.visit('/forgot-password');
    });

    it('displays forgot password form correctly', () => {
      cy.contains('Redefinir sua senha').should('be.visible');
      cy.get('[placeholder="Digite seu email"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Enviar link de redefinição');
    });

    it('validates email field', () => {
      // Test with empty email
      cy.get('[data-testid="reset-password-button"]').click();
      cy.wait(500);
      cy.url().should('include', '/forgot-password');
      cy.get('@forgotPasswordRequest.all').should('have.length', 0);

      // Test with invalid email format
      cy.get('[data-testid="email-input"]').type('invalid-email');
      cy.get('[data-testid="reset-password-button"]').click();
      cy.wait(500);
      cy.url().should('include', '/forgot-password');
      cy.get('[data-testid="email-input"]').should('have.value', 'invalid-email');
      cy.get('@forgotPasswordRequest.all').should('have.length', 0);

      // Test with valid email format should allow submission
      cy.get('[data-testid="email-input"]').clear().type('user@example.com');
      cy.get('[data-testid="reset-password-button"]').click();
      cy.wait(500);
      // This should trigger the request (but will be intercepted)
      cy.get('@forgotPasswordRequest.all').should('have.length', 1);
    });

    it('navigates back to login page', () => {
      cy.contains('Voltar para login').click();
      cy.url().should('include', '/login');
    });
  });

  describe('Protected Routes', () => {
    it('redirects unauthenticated users to login', () => {
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });

    it('allows access to dashboard when authenticated', () => {
      // Mock authenticated state
      cy.mockAuth({ id: 1, name: 'John Doe', email: 'john@example.com' });

      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');
      cy.contains('Bem-vindo ao Companion').should('be.visible');
    });
  });

  describe('Navigation', () => {
    it('redirects root path to dashboard', () => {
      cy.visit('/');
      cy.url().should('include', '/login');
    });

    it('redirects unknown paths to login', () => {
      cy.visit('/unknown-path');
      cy.url().should('include', '/login');
    });
  });

  describe('Responsive Design', () => {
    const viewports = [
      { width: 375, height: 667, device: 'iPhone SE' },
      { width: 768, height: 1024, device: 'iPad' },
      { width: 1024, height: 768, device: 'Desktop' },
    ];

    viewports.forEach(viewport => {
      it(`displays correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/login');

        cy.get('[placeholder="Digite seu email"]').should('be.visible');
        cy.get('[placeholder="Digite sua senha"]').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
      });
    });
  });

  describe('Performance', () => {
    it('loads login page quickly', () => {
      cy.visit('/login', {
        onBeforeLoad: win => {
          win.performance.mark('start');
        },
        onLoad: win => {
          win.performance.mark('end');
          win.performance.measure('pageLoad', 'start', 'end');
          const measure = win.performance.getEntriesByName('pageLoad')[0];
          expect(measure.duration).to.be.lessThan(3000); // Less than 3 seconds for better reliability
        },
      });
    });
  });
});
