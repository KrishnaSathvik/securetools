import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('Utils', () => {
  describe('cn function', () => {
    it('merges class names correctly', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2')
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
      expect(cn(
        'base-class',
        { 'conditional-class': true },
        false && 'hidden-class',
        ['array-class1', 'array-class2'],
        'final-class'
      )).toBe('base-class conditional-class array-class1 array-class2 final-class')
    })
  })
})
