import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { useAuthStore } from '../stores/authStore';

// Mock the auth store
jest.mock('../stores/authStore');

// Mock the AppRouter component to avoid routing complexity in unit tests
jest.mock('../routes/AppRouter', () => {
  return function MockAppRouter() {
    return <div data-testid="app-router">App Router</div>;
  };
});

describe('App', () => {
  const mockInitialize = jest.fn();

  beforeEach(() => {
    useAuthStore.mockReturnValue({
      initialize: mockInitialize,
    });
    jest.clearAllMocks();
  });

  test('renders AppRouter', () => {
    render(<App />);
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
  });

  test('calls initialize on mount', () => {
    render(<App />);
    expect(mockInitialize).toHaveBeenCalledTimes(1);
  });
});
