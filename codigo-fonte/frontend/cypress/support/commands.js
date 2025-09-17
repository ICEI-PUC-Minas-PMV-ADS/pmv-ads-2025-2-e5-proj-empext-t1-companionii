// Custom Cypress commands

// Command to get element by data-testid
Cypress.Commands.add('getByTestId', testId => {
  return cy.get(`[data-testid="${testId}"]`);
});

// Command to get element by text content
Cypress.Commands.add('getByText', text => {
  return cy.contains(text);
});

// Command to type in input by label
Cypress.Commands.add('typeInInput', (label, value) => {
  return cy.contains('label', label).parent().find('input').type(value);
});

// Command to click button by text
Cypress.Commands.add('clickButton', buttonText => {
  return cy.contains('button', buttonText).click();
});

// Command to wait for element to be visible
Cypress.Commands.add('waitForVisible', (selector, timeout = 10000) => {
  return cy.get(selector, { timeout }).should('be.visible');
});

// Command to check if element has specific class
Cypress.Commands.add(
  'shouldHaveClass',
  { prevSubject: 'element' },
  (subject, className) => {
    return cy.wrap(subject).should('have.class', className);
  },
);

// Command to login using data-testid selectors
Cypress.Commands.add(
  'login',
  (email = 'test@example.com', password = 'password123') => {
    cy.visit('/login');
    cy.getByTestId('email-input').type(email);
    cy.getByTestId('password-input').type(password);
    cy.getByTestId('login-button').click();
  },
);

// Command to register a new user
Cypress.Commands.add(
  'register',
  (
    name = 'Test User',
    email = 'test@example.com',
    password = 'password123',
  ) => {
    cy.visit('/register');
    cy.getByTestId('name-input').type(name);
    cy.getByTestId('email-input').type(email);
    cy.getByTestId('password-input').type(password);
    cy.getByTestId('confirm-password-input').type(password);
    cy.getByTestId('terms-checkbox').check();
    cy.getByTestId('register-button').click();
  },
);

// Command to reset password
Cypress.Commands.add('resetPassword', (email = 'test@example.com') => {
  cy.visit('/forgot-password');
  cy.getByTestId('email-input').type(email);
  cy.getByTestId('reset-password-button').click();
});

// Command to mock authentication state
Cypress.Commands.add('mockAuth', (user = null) => {
  const defaultUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: true,
    createdAt: new Date().toISOString(),
  };

  const mockAuthState = {
    state: {
      user: user || defaultUser,
      token: 'mock-token',
      refreshToken: 'mock-refresh-token',
      isAuthenticated: true,
    },
    version: 0,
  };

  cy.window().then(win => {
    win.localStorage.setItem('auth-storage', JSON.stringify(mockAuthState));
  });
});

// Command to clear authentication state
Cypress.Commands.add('clearAuth', () => {
  cy.window().then(win => {
    win.localStorage.removeItem('auth-storage');
  });
});

// Command to check accessibility
Cypress.Commands.add('checkA11y', () => {
  // This would require cypress-axe plugin
  // cy.injectAxe();
  // cy.checkA11y();
});
