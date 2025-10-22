// Tests for utility functions
// Testing the cn() function that combines clsx and tailwind-merge

import { cn } from '../../src/lib/utils';

describe('Utility Functions', () => {
  describe('cn() - Class Name Merger', () => {
    it('should merge class names correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toContain('base-class');
      expect(result).toContain('active-class');
    });

    it('should handle false conditional classes', () => {
      const isActive = false;
      const result = cn('base-class', isActive && 'active-class');
      expect(result).toBe('base-class');
      expect(result).not.toContain('active-class');
    });

    it('should merge conflicting tailwind classes', () => {
      // tailwind-merge should keep only the last conflicting class
      const result = cn('p-4', 'p-8');
      expect(result).toBe('p-8');
    });

    it('should handle array of classes', () => {
      const result = cn(['class1', 'class2', 'class3']);
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });

    it('should handle object notation', () => {
      const result = cn({
        'text-red-500': true,
        'bg-blue-500': false,
        'font-bold': true
      });
      expect(result).toContain('text-red-500');
      expect(result).not.toContain('bg-blue-500');
      expect(result).toContain('font-bold');
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle null and undefined', () => {
      const result = cn('base', null, undefined, 'end');
      expect(result).toBe('base end');
    });

    it('should handle complex combinations', () => {
      const isLarge = true;
      const isDisabled = false;
      const result = cn(
        'btn',
        isLarge && 'btn-lg',
        isDisabled && 'btn-disabled',
        { 'btn-primary': true, 'btn-secondary': false }
      );
      expect(result).toContain('btn');
      expect(result).toContain('btn-lg');
      expect(result).not.toContain('btn-disabled');
      expect(result).toContain('btn-primary');
      expect(result).not.toContain('btn-secondary');
    });
  });
});
