// Tests for Card component - Simplified
import '@testing-library/jest-dom';

describe('Card Components', () => {
  it('should export all Card components', () => {
    const cardModule = require('../../../src/components/ui/card');
    expect(cardModule.Card).toBeDefined();
    expect(cardModule.CardHeader).toBeDefined();
    expect(cardModule.CardTitle).toBeDefined();
    expect(cardModule.CardDescription).toBeDefined();
    expect(cardModule.CardContent).toBeDefined();
    expect(cardModule.CardFooter).toBeDefined();
  });
});
