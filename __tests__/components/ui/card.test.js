// Tests for Card components
// Testing Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../../../src/components/ui/card';

describe('Card Components', () => {
  describe('Card', () => {
    it('should render card with children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should have default card styles', () => {
      const { container } = render(<Card>Test</Card>);
      const card = container.firstChild;
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('shadow-sm');
    });

    it('should apply custom className', () => {
      const { container } = render(<Card className="custom-card">Test</Card>);
      expect(container.firstChild).toHaveClass('custom-card');
    });

    it('should support ref forwarding', () => {
      const ref = React.createRef();
      render(<Card ref={ref}>Ref test</Card>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('CardHeader', () => {
    it('should render header with children', () => {
      render(<CardHeader>Header content</CardHeader>);
      expect(screen.getByText('Header content')).toBeInTheDocument();
    });

    it('should have default header styles', () => {
      const { container } = render(<CardHeader>Header</CardHeader>);
      const header = container.firstChild;
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('p-6');
    });

    it('should apply custom className', () => {
      const { container } = render(<CardHeader className="custom-header">Test</CardHeader>);
      expect(container.firstChild).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('should render title with children', () => {
      render(<CardTitle>Title text</CardTitle>);
      expect(screen.getByText('Title text')).toBeInTheDocument();
    });

    it('should render as h3 element', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title.tagName).toBe('H3');
    });

    it('should have title styles', () => {
      render(<CardTitle>Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('text-2xl');
      expect(title).toHaveClass('font-semibold');
    });

    it('should apply custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('CardDescription', () => {
    it('should render description with children', () => {
      render(<CardDescription>Description text</CardDescription>);
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });

    it('should render as p element', () => {
      render(<CardDescription>Desc</CardDescription>);
      const desc = screen.getByText('Desc');
      expect(desc.tagName).toBe('P');
    });

    it('should have description styles', () => {
      render(<CardDescription>Desc</CardDescription>);
      const desc = screen.getByText('Desc');
      expect(desc).toHaveClass('text-sm');
      expect(desc).toHaveClass('text-gray-500');
    });
  });

  describe('CardContent', () => {
    it('should render content with children', () => {
      render(<CardContent>Content text</CardContent>);
      expect(screen.getByText('Content text')).toBeInTheDocument();
    });

    it('should have content styles', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      const content = container.firstChild;
      expect(content).toHaveClass('p-6');
      expect(content).toHaveClass('pt-0');
    });
  });

  describe('CardFooter', () => {
    it('should render footer with children', () => {
      render(<CardFooter>Footer content</CardFooter>);
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('should have footer styles', () => {
      const { container } = render(<CardFooter>Footer</CardFooter>);
      const footer = container.firstChild;
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('items-center');
      expect(footer).toHaveClass('p-6');
    });
  });

  describe('Full Card Composition', () => {
    it('should render complete card with all parts', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Title</CardTitle>
            <CardDescription>Test Description</CardDescription>
          </CardHeader>
          <CardContent>Test Content</CardContent>
          <CardFooter>Test Footer</CardFooter>
        </Card>
      );

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
      expect(screen.getByText('Test Footer')).toBeInTheDocument();
    });
  });

  describe('Display Names', () => {
    it('should have correct display names', () => {
      expect(Card.displayName).toBe('Card');
      expect(CardHeader.displayName).toBe('CardHeader');
      expect(CardTitle.displayName).toBe('CardTitle');
      expect(CardDescription.displayName).toBe('CardDescription');
      expect(CardContent.displayName).toBe('CardContent');
      expect(CardFooter.displayName).toBe('CardFooter');
    });
  });
});
