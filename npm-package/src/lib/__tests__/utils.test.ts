import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('utils', () => {
  describe('cn', () => {
    it('merges class names', () => {
      const result = cn('class1', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('handles conditional classes', () => {
      const result = cn('class1', false && 'class2', 'class3')
      expect(result).toBe('class1 class3')
    })

    it('handles undefined and null', () => {
      const result = cn('class1', undefined, null, 'class2')
      expect(result).toBe('class1 class2')
    })

    it('handles empty strings', () => {
      const result = cn('class1', '', 'class2')
      expect(result).toBe('class1 class2')
    })

    it('handles array of classes', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toBe('class1 class2 class3')
    })

    it('handles object with boolean values', () => {
      const result = cn({
        'class1': true,
        'class2': false,
        'class3': true
      })
      expect(result).toBe('class1 class3')
    })

    it('handles tailwind merge conflicts', () => {
      const result = cn('p-4', 'p-2')
      expect(result).toBe('p-2') // Should keep the last conflicting class
    })

    it('handles complex scenarios', () => {
      const result = cn(
        'base-class',
        'text-blue-500',
        false && 'hidden',
        true && 'visible',
        { 'active': true, 'inactive': false },
        ['array-class1', 'array-class2']
      )
      expect(result).toContain('base-class')
      expect(result).toContain('text-blue-500')
      expect(result).toContain('visible')
      expect(result).toContain('active')
      expect(result).toContain('array-class1')
      expect(result).toContain('array-class2')
      expect(result).not.toContain('hidden')
      expect(result).not.toContain('inactive')
    })
  })
})