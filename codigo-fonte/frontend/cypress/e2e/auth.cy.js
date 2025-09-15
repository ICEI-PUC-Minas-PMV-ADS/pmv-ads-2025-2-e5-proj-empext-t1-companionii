describe('Authentication Flow', () => {
  beforeEach(() => {
    // Clear any existing auth state
    cy.window().then(win => {
      win.localStorage.clear();
    });
  });

  describe('Login Page', () => {
    beforeEach(() => {
      cy.visit('/login');
    });

    it('displays login form correctly', () => {
      cy.contains('Welcome back').should('be.visible');
      cy.get('[placeholder="Enter your email"]').should('be.visible');
      cy.get('[placeholder="Enter your password"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Sign in');
      cy.get('button').contains('Continue with Google').should('be.visible');
    });

    it('validates required fields', () => {
      cy.get('button[type="submit"]').click();

      cy.contains('Email is required').should('be.visible');
      cy.contains('Password is required').should('be.visible');
    });

    it('validates email format', () => {
      cy.get('[placeholder="Enter your email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();

      cy.contains('Please enter a valid email address').should('be.visible');
    });

    it('validates password length', () => {
      cy.get('[placeholder="Enter your email"]').type('test@example.com');
      cy.get('[placeholder="Enter your password"]').type('123');
      cy.get('button[type="submit"]').click();

      cy.contains('Password must be at least 8 characters long').should(
        'be.visible',
      );
    });

    it('toggles password visibility', () => {
      cy.get('[placeholder="Enter your password"]').type('password123');

      // Password should be hidden by default
      cy.get('[placeholder="Enter your password"]').should(
        'have.attr',
        'type',
        'password',
      );

      // Click toggle button
      cy.get('[placeholder="Enter your password"]')
        .parent()
        .find('button')
        .click();

      // Password should now be visible
      cy.get('[placeholder="Enter your password"]').should(
        'have.attr',
        'type',
        'text',
      );
    });

    it('navigates to registration page', () => {
      cy.contains('Sign up').click();
      cy.url().should('include', '/register');
    });

    it('navigates to forgot password page', () => {
      cy.contains('Forgot password?').click();
      cy.url().should('include', '/forgot-password');
    });
  });

  describe('Registration Page', () => {
    beforeEach(() => {
      cy.visit('/register');
    });

    it('displays registration form correctly', () => {
      cy.contains('Create your account').should('be.visible');
      cy.get('[placeholder="Enter your full name"]').should('be.visible');
      cy.get('[placeholder="Enter your email"]').should('be.visible');
      cy.get('[placeholder="Create a password"]').should('be.visible');
      cy.get('[placeholder="Confirm your password"]').should('be.visible');
      cy.get('input[type="checkbox"]').should('be.visible');
    });

    it('shows password strength indicator', () => {
      cy.get('[placeholder="Create a password"]').type('weak');
      cy.contains('weak', { matchCase: false }).should('be.visible');

      cy.get('[placeholder="Create a password"]')
        .clear()
        .type('StrongPassword123');
      cy.contains('strong', { matchCase: false }).should('be.visible');
    });

    it('validates password confirmation', () => {
      cy.get('[placeholder="Enter your full name"]').type('John Doe');
      cy.get('[placeholder="Enter your email"]').type('john@example.com');
      cy.get('[placeholder="Create a password"]').type('password123');
      cy.get('[placeholder="Confirm your password"]').type('different');
      cy.get('input[type="checkbox"]').check();

      cy.get('button[type="submit"]').click();

      cy.contains("Passwords don't match").should('be.visible');
    });

    it('requires terms acceptance', () => {
      cy.get('[placeholder="Enter your full name"]').type('John Doe');
      cy.get('[placeholder="Enter your email"]').type('john@example.com');
      cy.get('[placeholder="Create a password"]').type('password123');
      cy.get('[placeholder="Confirm your password"]').type('password123');

      cy.get('button[type="submit"]').click();

      cy.contains('You must accept the terms and conditions').should(
        'be.visible',
      );
    });

    it('navigates back to login page', () => {
      cy.contains('Sign in').click();
      cy.url().should('include', '/login');
    });
  });

  describe('Forgot Password Page', () => {
    beforeEach(() => {
      cy.visit('/forgot-password');
    });

    it('displays forgot password form correctly', () => {
      cy.contains('Reset your password').should('be.visible');
      cy.get('[placeholder="Enter your email"]').should('be.visible');
      cy.get('button[type="submit"]').should('contain', 'Send reset link');
    });

    it('validates email field', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Email is required').should('be.visible');

      cy.get('[placeholder="Enter your email"]').type('invalid-email');
      cy.get('button[type="submit"]').click();
      cy.contains('Please enter a valid email address').should('be.visible');
    });

    it('navigates back to login page', () => {
      cy.contains('Back to sign in').click();
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
      cy.window().then(win => {
        const mockAuthState = {
          state: {
            user: { id: 1, name: 'John Doe', email: 'john@example.com' },
            token: 'mock-token',
            refreshToken: 'mock-refresh-token',
            isAuthenticated: true,
          },
          version: 0,
        };
        win.localStorage.setItem('auth-storage', JSON.stringify(mockAuthState));
      });

      cy.visit('/dashboard');
      cy.url().should('include', '/dashboard');
      cy.contains('Welcome to Companion').should('be.visible');
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

        cy.get('[placeholder="Enter your email"]').should('be.visible');
        cy.get('[placeholder="Enter your password"]').should('be.visible');
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
          expect(measure.duration).to.be.lessThan(1000); // Less than 1 second
        },
      });
    });
  });
});
