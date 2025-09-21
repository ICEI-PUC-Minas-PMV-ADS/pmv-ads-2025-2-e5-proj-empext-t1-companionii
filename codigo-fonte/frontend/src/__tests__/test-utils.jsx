import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

// Mock for useAuthStore
export const createMockAuthStore = (initialState = {}) => ({
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  loginAttempts: 0,
  lastLoginAttempt: null,
  login: jest.fn(),
  register: jest.fn(),
  forgotPassword: jest.fn(),
  logout: jest.fn(),
  refreshToken: jest.fn(),
  isRateLimited: jest.fn(() => false),
  getCooldownTime: jest.fn(() => 0),
  initialize: jest.fn(),
  ...initialState,
});

// Mock for useToast
export const createMockToast = () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
    promise: jest.fn(),
  },
  toasts: [],
  removeToast: jest.fn(),
  updateToast: jest.fn(),
  clearAllToasts: jest.fn(),
});

// Test wrapper components
export const RouterWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

export const AuthProvider = ({ children, authState = {} }) => {
  // Mock implementation of auth context if needed
  return children;
};

// Custom render function with common providers
export const renderWithProviders = (ui, options = {}) => {
  const { initialEntries = ['/'], ...renderOptions } = options;

  const Wrapper = ({ children }) => <BrowserRouter>{children}</BrowserRouter>;

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock implementations for external dependencies
export const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

export const mockAxios = {
  create: jest.fn(() => mockAxios),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  patch: jest.fn(),
  interceptors: {
    request: { use: jest.fn(), eject: jest.fn() },
    response: { use: jest.fn(), eject: jest.fn() },
  },
  defaults: {
    headers: {
      common: {},
    },
  },
};

// Utility functions for tests
export const waitForLoadingToFinish = async () => {
  const { waitForElementToBeRemoved, screen } = await import(
    '@testing-library/react'
  );
  await waitForElementToBeRemoved(() => screen.queryByText(/loading/i), {
    timeout: 3000,
  });
};

export const fillForm = async (form, user) => {
  for (const [field, value] of Object.entries(form)) {
    const input = screen.getByLabelText(new RegExp(field, 'i'));
    if (input.type === 'checkbox') {
      if (value) {
        await user.check(input);
      } else {
        await user.uncheck(input);
      }
    } else {
      await user.clear(input);
      await user.type(input, value);
    }
  }
};

// Mock window.location
export const mockWindowLocation = (url = 'http://localhost:3000') => {
  const location = new URL(url);
  delete window.location;
  window.location = {
    ...location,
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  };
  return window.location;
};

// Performance testing utilities
export const measurePerformance = (name, fn) => {
  const startTime = performance.now();
  const result = fn();
  const endTime = performance.now();
  const duration = endTime - startTime;

  console.log(`${name} took ${duration.toFixed(2)}ms`);

  return { result, duration };
};

// Accessibility testing helpers
export const checkAccessibility = async container => {
  const { axe } = await import('jest-axe');
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
