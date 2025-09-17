import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input', () => {
  test('renders input with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  test('renders with label', () => {
    render(<Input label="Email" placeholder="Enter email" />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  test('displays error message', () => {
    render(<Input label="Email" error="Email is required" />);

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
  });

  test('displays help text when no error', () => {
    render(<Input helpText="Enter a valid email address" />);

    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument();
  });

  test('toggles password visibility', () => {
    render(<Input type="password" showPasswordToggle placeholder="Password" />);

    const input = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByRole('button');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  test('handles input changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test value');
  });

  test('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} placeholder="Test" />);

    expect(ref.current).toBe(screen.getByPlaceholderText('Test'));
  });
});
