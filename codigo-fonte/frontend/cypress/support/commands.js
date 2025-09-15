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

// Command to login (example for when auth is implemented)
Cypress.Commands.add(
  'login',
  (email = 'test@example.com', password = 'password123') => {
    cy.visit('/login');
    cy.get('[data-testid="email-input"]').type(email);
    cy.get('[data-testid="password-input"]').type(password);
    cy.get('[data-testid="login-button"]').click();
  },
);

// Command to check accessibility
Cypress.Commands.add('checkA11y', () => {
  // This would require cypress-axe plugin
  // cy.injectAxe();
  // cy.checkA11y();
});
