// Tests for Footer component
// Testing footer rendering and content

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../src/components/Footer';

describe('Footer Component', () => {
  it('should render footer', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('should display MoneyMirror branding', () => {
    render(<Footer />);
    expect(screen.getByText(/Money/)).toBeInTheDocument();
    expect(screen.getByText(/Mirror/)).toBeInTheDocument();
  });

  it('should display tagline', () => {
    render(<Footer />);
    expect(screen.getByText('Your financial companion')).toBeInTheDocument();
  });

  it('should display current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('should display copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/MoneyMirror. All rights reserved/)).toBeInTheDocument();
  });

  it('should display Holberton School attribution', () => {
    render(<Footer />);
    expect(screen.getByText('Made by Holberton School')).toBeInTheDocument();
  });

  it('should render SVG icon', () => {
    const { container } = render(<Footer />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have border top', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('border-t');
  });

  it('should have white background', () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('bg-white');
  });

  it('should have gradient icon background', () => {
    const { container } = render(<Footer />);
    const iconContainer = container.querySelector('.bg-gradient-to-br');
    expect(iconContainer).toBeInTheDocument();
  });
});
