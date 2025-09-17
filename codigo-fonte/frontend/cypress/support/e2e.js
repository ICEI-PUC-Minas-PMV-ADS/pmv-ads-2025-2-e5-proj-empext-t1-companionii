// Import commands.js using ES2015 syntax:
import './commands';

// Hide fetch/XHR requests from the command log
const app = window.top;

if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

// Configure global test settings
beforeEach(() => {
  // Reset any state before each test
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', err => {
  // Return false to prevent the uncaught exception from failing the test
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
  if (err.message.includes('Non-Error promise rejection captured')) {
    return false;
  }
  return true;
});
