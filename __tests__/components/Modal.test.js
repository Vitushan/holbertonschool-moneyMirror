// Tests for Modal component - Simplified
import '@testing-library/jest-dom';

describe('Modal Component', () => {
  it('should export Modal component', () => {
    const Modal = require('../../src/components/Modal').default;
    expect(Modal).toBeDefined();
  });
});
