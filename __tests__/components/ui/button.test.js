// Tests for Button component - Simplified
import '@testing-library/jest-dom';

describe('Button Component', () => {
  it('should export Button component', () => {
    const { Button } = require('../../../src/components/ui/button');
    expect(Button).toBeDefined();
  });

  it('should export buttonVariants', () => {
    const { buttonVariants } = require('../../../src/components/ui/button');
    expect(buttonVariants).toBeDefined();
    expect(buttonVariants.default).toBeDefined();
  });
});
