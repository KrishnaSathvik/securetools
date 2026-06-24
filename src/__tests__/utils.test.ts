import { describe, it, expect } from 'vitest'
import { cn } from '../lib/utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      const showClass2 = true;
      const showClass3 = false;
      expect(cn('class1', showClass2 ? 'class2' : '', showClass3 ? 'class3' : '')).toBe('class1 class2')
    })

    it('handles undefined and null values', () => {
      expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
    })

    it('handles empty strings', () => {
      expect(cn('class1', '', 'class2')).toBe('class1 class2')
    })

    it('handles objects with boolean values', () => {
      expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2')
    })

    it('handles arrays', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3')
    })

    it('handles complex combinations', () => {
      const hidden = false;
      expect(cn(
        'base-class',
        { 'conditional-class': true },
        hidden ? 'hidden-class' : '',
        ['array-class1', 'array-class2'],
        'final-class'
      )).toBe('base-class conditional-class array-class1 array-class2 final-class')
    })
  })
})
