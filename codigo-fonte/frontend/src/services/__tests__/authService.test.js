import axios from 'axios';
import { authService } from '../authService';

// Mock axios
jest.mock('axios');
const mockedAxios = axios;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.create.mockReturnThis();
    mockedAxios.interceptors = {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    };
  });

  describe('login', () => {
    test('successful login returns user data', async () => {
      const mockResponse = {
        data: {
          user: { id: 1, name: 'John Doe', email: 'john@example.com' },
          token: 'mock-token',
          refreshToken: 'mock-refresh-token',
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authService.login({
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/login', {
        email: 'john@example.com',
        password: 'password123',
      });
    });

    test('handles 401 error correctly', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Invalid credentials' },
        },
      };

      mockedAxios.post.mockRejectedValue(mockError);

      await expect(
        authService.login({
          email: 'john@example.com',
          password: 'wrongpassword',
        }),
      ).rejects.toThrow('Invalid credentials');
    });

    test('handles network error', async () => {
      const mockError = {
        request: true,
        message: 'Network Error',
      };

      mockedAxios.post.mockRejectedValue(mockError);

      await expect(
        authService.login({
          email: 'john@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow('Network error. Please check your connection.');
    });
  });

  describe('register', () => {
    test('successful registration', async () => {
      const mockResponse = {
        data: { success: true, message: 'User created successfully' },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authService.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/register', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    });

    test('handles email already exists error', async () => {
      const mockError = {
        response: {
          status: 409,
          data: { message: 'Email already exists' },
        },
      };

      mockedAxios.post.mockRejectedValue(mockError);

      await expect(
        authService.register({
          name: 'John Doe',
          email: 'existing@example.com',
          password: 'password123',
        }),
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('forgotPassword', () => {
    test('successful forgot password request', async () => {
      const mockResponse = {
        data: { success: true, message: 'Reset email sent' },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authService.forgotPassword('john@example.com');

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/forgot-password', {
        email: 'john@example.com',
      });
    });

    test('handles user not found error', async () => {
      const mockError = {
        response: {
          status: 404,
          data: { message: 'User not found' },
        },
      };

      mockedAxios.post.mockRejectedValue(mockError);

      await expect(
        authService.forgotPassword('nonexistent@example.com'),
      ).rejects.toThrow('User not found');
    });
  });

  describe('getCurrentUser', () => {
    test('gets current user with valid token', async () => {
      const mockResponse = {
        data: { id: 1, name: 'John Doe', email: 'john@example.com' },
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser('valid-token');

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith('/auth/me', {
        headers: { Authorization: 'Bearer valid-token' },
      });
    });

    test('handles invalid token error', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Invalid token' },
        },
      };

      mockedAxios.get.mockRejectedValue(mockError);

      await expect(authService.getCurrentUser('invalid-token')).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('refreshToken', () => {
    test('refreshes token successfully', async () => {
      const mockResponse = {
        data: {
          token: 'new-token',
          refreshToken: 'new-refresh-token',
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await authService.refreshToken('refresh-token');

      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.post).toHaveBeenCalledWith('/auth/refresh', {
        refreshToken: 'refresh-token',
      });
    });
  });

  describe('getGoogleAuthUrl', () => {
    test('returns correct Google auth URL', () => {
      const url = authService.getGoogleAuthUrl();
      expect(url).toBe('http://localhost:3000/auth/google');
    });
  });

  describe('logout', () => {
    test('calls logout endpoint', async () => {
      mockedAxios.post.mockResolvedValue({ data: { success: true } });

      await authService.logout('token');

      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/auth/logout',
        {},
        {
          headers: { Authorization: 'Bearer token' },
        },
      );
    });

    test('does not throw error on logout failure', async () => {
      mockedAxios.post.mockRejectedValue(new Error('Server error'));

      // Should not throw
      await expect(authService.logout('token')).resolves.toBeUndefined();
    });
  });
});
