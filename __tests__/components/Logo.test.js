// Tests for Logo component
// Testing sizes and rendering

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../../src/components/Logo';

describe('Logo Component', () => {
  it('should render logo with default props', () => {
    render(<Logo />);
    expect(screen.getByText(/Money/)).toBeInTheDocument();
    expect(screen.getByText(/Mirror/)).toBeInTheDocument();
  });

  it('should render tagline', () => {
    render(<Logo />);
    expect(screen.getByText('Suivez vos finances')).toBeInTheDocument();
  });

  it('should render default size', () => {
    const { container } = render(<Logo />);
    const iconContainer = container.querySelector('.h-10');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should render small size', () => {
    const { container } = render(<Logo size="small" />);
    const iconContainer = container.querySelector('.h-8');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should render large size', () => {
    const { container } = render(<Logo size="large" />);
    const iconContainer = container.querySelector('.h-12');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should render SVG icon', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have gradient background', () => {
    const { container } = render(<Logo />);
    const iconContainer = container.querySelector('.bg-gradient-to-br');
    expect(iconContainer).toBeInTheDocument();
  });

  it('should have Money text in bold', () => {
    const { container } = render(<Logo />);
    const money = screen.getByText(/Money/);
    expect(money).toHaveClass('font-bold');
  });

  it('should have Mirror text with gradient', () => {
    const { container } = render(<Logo />);
    const mirror = container.querySelector('.text-transparent.bg-clip-text.bg-gradient-to-r');
    expect(mirror).toBeInTheDocument();
    expect(mirror).toHaveTextContent('Mirror');
  });

  it('should have proper structure', () => {
    const { container } = render(<Logo />);
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('items-center');
    expect(mainContainer).toHaveClass('gap-3');
  });

  it('should render with shadow', () => {
    const { container } = render(<Logo />);
    const iconContainer = container.querySelector('.shadow-xl');
    expect(iconContainer).toBeInTheDocument();
  });
});
