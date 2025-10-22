// Tests for Button component
// Testing variants, sizes, and accessibility

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../../../src/components/ui/button';

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600');
  });

  it('should render with custom text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('should apply variant classes correctly', () => {
    const { rerender } = render(<Button variant="destructive">Delete</Button>);
    let button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-red-600');

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByText('Outline');
    expect(button).toHaveClass('border');
    expect(button).toHaveClass('bg-white');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-gray-200');

    rerender(<Button variant="ghost">Ghost</Button>);
    button = screen.getByText('Ghost');
    expect(button).toHaveClass('hover:bg-gray-100');

    rerender(<Button variant="link">Link</Button>);
    button = screen.getByText('Link');
    expect(button).toHaveClass('text-blue-600');

    rerender(<Button variant="success">Success</Button>);
    button = screen.getByText('Success');
    expect(button).toHaveClass('bg-green-600');
  });

  it('should apply size classes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    let button = screen.getByText('Small');
    expect(button).toHaveClass('h-9');
    expect(button).toHaveClass('px-3');

    rerender(<Button size="lg">Large</Button>);
    button = screen.getByText('Large');
    expect(button).toHaveClass('h-11');
    expect(button).toHaveClass('px-8');

    rerender(<Button size="icon">Icon</Button>);
    button = screen.getByText('Icon');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('w-10');
  });

  it('should handle click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText('Disabled Button');

    expect(button).toBeDisabled();
  });

  it('should not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);

    const button = screen.getByText('Disabled');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should apply custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByText('Custom');

    expect(button).toHaveClass('custom-class');
  });

  it('should support ref forwarding', () => {
    const ref = React.createRef();
    render(<Button ref={ref}>Ref Button</Button>);

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('should have correct display name', () => {
    expect(Button.displayName).toBe('Button');
  });

  it('should render with type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByText('Submit');

    expect(button).toHaveAttribute('type', 'submit');
  });

  it('should support aria attributes', () => {
    render(<Button aria-label="Test button">Aria</Button>);
    const button = screen.getByLabelText('Test button');

    expect(button).toBeInTheDocument();
  });

  it('should have transition classes', () => {
    render(<Button>Transition</Button>);
    const button = screen.getByText('Transition');

    expect(button).toHaveClass('transition-all');
  });

  it('should have focus visible styles', () => {
    render(<Button>Focus</Button>);
    const button = screen.getByText('Focus');

    expect(button).toHaveClass('focus-visible:outline-none');
    expect(button).toHaveClass('focus-visible:ring-2');
  });
});
