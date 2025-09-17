import axios from 'axios';

// Base API configuration
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        if (parsedToken?.state?.token) {
          config.headers.Authorization = `Bearer ${parsedToken.state.token}`;
        }
      } catch (error) {
        console.error('Error parsing auth token:', error);
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsedAuth = JSON.parse(authStorage);
          const refreshToken = parsedAuth?.state?.refreshToken;

          if (refreshToken) {
            const response = await api.post('/auth/refresh', {
              refreshToken,
            });

            const { token, refreshToken: newRefreshToken } = response.data;

            parsedAuth.state.token = token;
            parsedAuth.state.refreshToken = newRefreshToken;
            localStorage.setItem('auth-storage', JSON.stringify(parsedAuth));

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          }
        }
      } catch {
        localStorage.removeItem('auth-storage');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  },
);

// Custom error handling
const handleApiError = error => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response;
    const message = data?.message || data?.error || 'An error occurred';

    switch (status) {
      case 400:
        throw new Error(message || 'Invalid request data');
      case 401:
        throw new Error('Invalid credentials');
      case 403:
        throw new Error('Access denied');
      case 404:
        throw new Error('Resource not found');
      case 409:
        throw new Error(message || 'Resource already exists');
      case 422:
        throw new Error(message || 'Validation failed');
      case 429:
        throw new Error('Too many requests. Please try again later.');
      case 500:
        throw new Error('Server error. Please try again later.');
      default:
        throw new Error(message || 'Something went wrong');
    }
  } else if (error.request) {
    // Network error
    throw new Error('Network error. Please check your connection.');
  } else {
    // Other error
    throw new Error(error.message || 'Something went wrong');
  }
};

export const authService = {
  // Login user
  login: async credentials => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Register new user
  register: async userData => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Forgot password
  forgotPassword: async email => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Refresh token
  refreshToken: async refreshToken => {
    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Logout
  logout: async token => {
    try {
      await api.post(
        '/auth/logout',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error) {
      // Don't throw error on logout failure
      console.error('Logout error:', error);
    }
  },

  // Get current user
  getCurrentUser: async token => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Google OAuth
  getGoogleAuthUrl: () => {
    return `${BASE_URL}/auth/google`;
  },

  // Verify Google OAuth callback
  verifyGoogleAuth: async (code, state) => {
    try {
      const response = await api.get('/auth/google/callback', {
        params: { code, state },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Reset password with token
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Resend verification email
  resendVerification: async email => {
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  // Verify email with token
  verifyEmail: async token => {
    try {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};
