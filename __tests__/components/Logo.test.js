// Tests for Logo component - Simplified
import '@testing-library/jest-dom';

describe('Logo Component', () => {
  it('should export Logo component', () => {
    const Logo = require('../../src/components/Logo').default;
    expect(Logo).toBeDefined();
  });
});
