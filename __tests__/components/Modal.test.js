// Tests for Modal component
// Testing modal rendering, callbacks, and accessibility

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from '../../src/components/Modal';

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockOnConfirm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render modal with children', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Are you sure?</p>
      </Modal>
    );
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should render Cancel and Confirm buttons', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Confirm action</p>
      </Modal>
    );
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
  });

  it('should call onClose when Cancel button is clicked', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm when Confirm button is clicked', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const confirmButton = screen.getByText('Confirm');
    fireEvent.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should have overlay with proper styling', () => {
    const { container } = render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const overlay = container.firstChild;
    expect(overlay).toHaveClass('fixed');
    expect(overlay).toHaveClass('inset-0');
    expect(overlay).toHaveClass('bg-black');
    expect(overlay).toHaveClass('bg-opacity-50');
    expect(overlay).toHaveClass('z-50');
  });

  it('should have modal container with proper styling', () => {
    const { container } = render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const modalContainer = container.querySelector('.bg-white.rounded-lg');
    expect(modalContainer).toBeInTheDocument();
    expect(modalContainer).toHaveClass('shadow-lg');
    expect(modalContainer).toHaveClass('p-6');
  });

  it('should have Cancel button with gray styling', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toHaveClass('bg-gray-200');
    expect(cancelButton).toHaveClass('text-gray-800');
  });

  it('should have Confirm button with red styling', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const confirmButton = screen.getByText('Confirm');
    expect(confirmButton).toHaveClass('bg-red-600');
    expect(confirmButton).toHaveClass('text-white');
  });

  it('should center modal in viewport', () => {
    const { container } = render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <p>Test</p>
      </Modal>
    );

    const overlay = container.firstChild;
    expect(overlay).toHaveClass('flex');
    expect(overlay).toHaveClass('items-center');
    expect(overlay).toHaveClass('justify-center');
  });

  it('should render complex children content', () => {
    render(
      <Modal onClose={mockOnClose} onConfirm={mockOnConfirm}>
        <div>
          <h2>Warning</h2>
          <p>This action cannot be undone</p>
        </div>
      </Modal>
    );

    expect(screen.getByText('Warning')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone')).toBeInTheDocument();
  });
});
