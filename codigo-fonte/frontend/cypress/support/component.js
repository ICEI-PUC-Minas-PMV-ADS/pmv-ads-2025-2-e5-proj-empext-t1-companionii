// Import component testing support
import { mount } from 'cypress/react';

// Import global styles for component testing
import '../../src/index.css';

// Custom mount command with default providers/wrappers
Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps: _routerProps = {}, ...mountOptions } = options;

  const wrapped = component;

  return mount(wrapped, mountOptions);
});

// Example of how to wrap with providers
// Cypress.Commands.add('mount', (component, options = {}) => {
//   const Wrapped = ({ children }) => {
//     return (
//       <ThemeProvider theme={theme}>
//         <BrowserRouter {...options.routerProps}>
//           {children}
//         </BrowserRouter>
//       </ThemeProvider>
//     );
//   };
//
//   return mount(<Wrapped>{component}</Wrapped>, options);
// });
