// Tests for Footer component - Simplified
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  it('should export Footer component', () => {
    const Footer = require('../../src/components/Footer').default;
    expect(Footer).toBeDefined();
  });
});
