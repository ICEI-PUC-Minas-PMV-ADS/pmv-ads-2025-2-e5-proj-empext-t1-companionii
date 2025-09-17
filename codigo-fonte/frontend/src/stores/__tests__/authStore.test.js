import { act, renderHook } from '@testing-library/react';
import { useAuthStore } from '../authStore';
import { authService } from '../../services/authService';

// Mock the auth service
jest.mock('../../services/authService', () => ({
  authService: {
    login: jest.fn(),
    register: jest.fn(),
    forgotPassword: jest.fn(),
    logout: jest.fn(),
    refreshToken: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('useAuthStore', () => {
  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);

    // Reset the store
    useAuthStore.setState({
      user: null,
      token: null,
      refreshToken: null,
      isLoading: false,
      isAuthenticated: false,
      loginAttempts: 0,
      lastLoginAttempt: null,
    });
  });

  describe('login', () => {
    test('successful login updates state correctly', async () => {
      const mockResponse = {
        user: { id: 1, name: 'John Doe', email: 'john@example.com' },
        token: 'mock-token',
        refreshToken: 'mock-refresh-token',
      };

      authService.login.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const response = await result.current.login({
          email: 'john@example.com',
          password: 'password123',
        });

        expect(response).toEqual({ success: true, user: mockResponse.user });
      });

      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe(mockResponse.token);
      expect(result.current.refreshToken).toBe(mockResponse.refreshToken);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.loginAttempts).toBe(0);
    });

    test('failed login increments attempts', async () => {
      authService.login.mockRejectedValue(new Error('Invalid credentials'));

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        try {
          await result.current.login({
            email: 'john@example.com',
            password: 'wrong-password',
          });
        } catch (error) {
          expect(error.message).toBe('Invalid credentials');
        }
      });

      expect(result.current.loginAttempts).toBe(1);
      expect(result.current.lastLoginAttempt).toBeTruthy();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('register', () => {
    test('successful registration', async () => {
      const mockResponse = {
        success: true,
        message: 'Registration successful',
      };
      authService.register.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        const response = await result.current.register({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password123',
        });

        expect(response).toEqual(mockResponse);
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('logout', () => {
    test('logout clears state', async () => {
      const { result } = renderHook(() => useAuthStore());

      // Set initial state
      act(() => {
        useAuthStore.setState({
          user: { id: 1, name: 'John Doe' },
          token: 'token',
          refreshToken: 'refresh-token',
          isAuthenticated: true,
        });
      });

      await act(async () => {
        await result.current.logout();
      });

      expect(result.current.user).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.refreshToken).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('rate limiting', () => {
    test('isRateLimited returns true after 5 attempts', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState({
          loginAttempts: 5,
          lastLoginAttempt: Date.now(),
        });
      });

      expect(result.current.isRateLimited()).toBe(true);
    });

    test('isRateLimited returns false after cooldown period', () => {
      const { result } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState({
          loginAttempts: 5,
          lastLoginAttempt: Date.now() - 16 * 60 * 1000, // 16 minutes ago
        });
      });

      expect(result.current.isRateLimited()).toBe(false);
    });
  });

  describe('initialize', () => {
    test('initializes with valid token', async () => {
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      authService.getCurrentUser.mockResolvedValue(mockUser);

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState({ token: 'valid-token' });
      });

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    test('clears state with invalid token', async () => {
      authService.getCurrentUser.mockRejectedValue(new Error('Invalid token'));

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        useAuthStore.setState({
          token: 'invalid-token',
          user: { id: 1 },
          isAuthenticated: true,
        });
      });

      await act(async () => {
        await result.current.initialize();
      });

      expect(result.current.user).toBe(null);
      expect(result.current.token).toBe(null);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
