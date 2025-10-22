// Tests for Input component
// Testing input types, events, and accessibility

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../../../src/components/ui/input';

describe('Input Component', () => {
  it('should render input element', () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');
    expect(input).toBeInTheDocument();
  });

  it('should have default input styles', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('border');
  });

  it('should apply custom className', () => {
    render(<Input className="custom-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-input');
  });

  it('should support different input types', () => {
    const { rerender } = render(<Input type="text" data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'text');

    rerender(<Input type="email" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<Input type="password" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input type="number" data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'number');
  });

  it('should handle value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should display placeholder text', () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByPlaceholderText('Enter your name');
    expect(input).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is passed', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('should have disabled styles when disabled', () => {
    render(<Input disabled data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('disabled:cursor-not-allowed');
    expect(input).toHaveClass('disabled:opacity-50');
  });

  it('should support ref forwarding', () => {
    const ref = React.createRef();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should have correct display name', () => {
    expect(Input.displayName).toBe('Input');
  });

  it('should support required attribute', () => {
    render(<Input required data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toBeRequired();
  });

  it('should support defaultValue', () => {
    render(<Input defaultValue="default text" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveValue('default text');
  });

  it('should support controlled input', () => {
    const { rerender } = render(<Input value="initial" onChange={() => {}} data-testid="input" />);
    let input = screen.getByTestId('input');
    expect(input).toHaveValue('initial');

    rerender(<Input value="updated" onChange={() => {}} data-testid="input" />);
    input = screen.getByTestId('input');
    expect(input).toHaveValue('updated');
  });

  it('should support name attribute', () => {
    render(<Input name="email" data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('should support aria attributes', () => {
    render(
      <Input
        aria-label="Email input"
        aria-describedby="email-help"
        data-testid="input"
      />
    );
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-label', 'Email input');
    expect(input).toHaveAttribute('aria-describedby', 'email-help');
  });

  it('should have focus styles', () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('focus:ring-2');
    expect(input).toHaveClass('focus:ring-blue-500');
  });

  it('should handle focus and blur events', () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} data-testid="input" />);

    const input = screen.getByTestId('input');
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('should support maxLength attribute', () => {
    render(<Input maxLength={10} data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('maxLength', '10');
  });

  it('should support min and max for number inputs', () => {
    render(<Input type="number" min={0} max={100} data-testid="input" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('min', '0');
    expect(input).toHaveAttribute('max', '100');
  });
});
