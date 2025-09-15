import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { useAuthStore } from '../../../stores/authStore';
import { useToast } from '../../../hooks/useToast';

// Mock the stores and hooks
jest.mock('../../../stores/authStore');
jest.mock('../../../hooks/useToast');
jest.mock('../../../services/authService', () => ({
  authService: {
    getGoogleAuthUrl: jest.fn(() => 'http://localhost:3000/auth/google'),
  },
}));

const mockLogin = jest.fn();
const mockToast = {
  success: jest.fn(),
  error: jest.fn(),
};

const LoginFormWrapper = ({ children }) => (
  <BrowserRouter>{children}</BrowserRouter>
);

describe('LoginForm', () => {
  beforeEach(() => {
    useAuthStore.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      isRateLimited: jest.fn(() => false),
      getCooldownTime: jest.fn(() => 0),
    });

    useToast.mockReturnValue({
      toast: mockToast,
    });

    jest.clearAllMocks();
  });

  test('renders form fields correctly', () => {
    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/remember me/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign in/i }),
    ).toBeInTheDocument();
  });

  test('validates email field', async () => {
    const user = userEvent.setup();

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  test('validates password field', async () => {
    const user = userEvent.setup();

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'test@example.com');

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockLogin.mockResolvedValue({ success: true });

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        rememberMe: false,
      });
      expect(mockToast.success).toHaveBeenCalledWith(
        'Login successful! Welcome back.',
      );
    });
  });

  test('handles login error', async () => {
    const user = userEvent.setup();
    mockLogin.mockRejectedValue(new Error('Invalid credentials'));

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'wrongpassword');
    await user.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/invalid email or password/i),
      ).toBeInTheDocument();
    });
  });

  test('prevents submission when rate limited', async () => {
    const user = userEvent.setup();
    useAuthStore.mockReturnValue({
      login: mockLogin,
      isLoading: false,
      isRateLimited: jest.fn(() => true),
      getCooldownTime: jest.fn(() => 10 * 60 * 1000), // 10 minutes
    });

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    expect(mockToast.error).toHaveBeenCalledWith(
      expect.stringContaining('Too many login attempts'),
    );
    expect(mockLogin).not.toHaveBeenCalled();
  });

  test('redirects to Google OAuth', () => {
    const mockAssign = jest.fn();
    delete window.location;
    window.location = { href: '', assign: mockAssign };

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const googleButton = screen.getByRole('button', {
      name: /continue with google/i,
    });
    fireEvent.click(googleButton);

    expect(window.location.href).toBe('http://localhost:3000/auth/google');
  });

  test('toggles remember me checkbox', async () => {
    const user = userEvent.setup();

    render(
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>,
    );

    const checkbox = screen.getByLabelText(/remember me/i);
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});
