import { describe, it, expect } from 'vitest'
import { applyFilters, applySorting, groupData, createGroupSummaries } from '../utils/data-utils'
import { mockEmployees, mockColumns } from '../../../test/mocks/data'
import { FilterConfig, SortConfig } from '../types'

describe('DataTable Utils', () => {
  describe('applyFilters', () => {
    it('filters data by text contains', () => {
      const filters: FilterConfig[] = [
        {
          field: 'name',
          operator: 'contains',
          value: 'John',
          type: 'text'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('John Doe')
    })

    it('filters data by exact match', () => {
      const filters: FilterConfig[] = [
        {
          field: 'department',
          operator: 'equals',
          value: 'Engineering',
          type: 'select'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(2)
      expect(result.every(emp => emp.department === 'Engineering')).toBe(true)
    })

    it('filters data by multiple values', () => {
      const filters: FilterConfig[] = [
        {
          field: 'department',
          operator: 'in',
          value: ['Engineering', 'Marketing'],
          type: 'select'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(3)
      expect(result.every(emp => ['Engineering', 'Marketing'].includes(emp.department))).toBe(true)
    })

    it('filters data by number range', () => {
      const filters: FilterConfig[] = [
        {
          field: 'salary',
          operator: 'gte',
          value: 80000,
          type: 'number'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(2)
      expect(result.every(emp => emp.salary >= 80000)).toBe(true)
    })

    it('filters data by boolean value', () => {
      const filters: FilterConfig[] = [
        {
          field: 'active',
          operator: 'equals',
          value: true,
          type: 'boolean'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(4)
      expect(result.every(emp => emp.active === true)).toBe(true)
    })

    it('applies multiple filters', () => {
      const filters: FilterConfig[] = [
        {
          field: 'department',
          operator: 'equals',
          value: 'Engineering',
          type: 'select'
        },
        {
          field: 'active',
          operator: 'equals',
          value: true,
          type: 'boolean'
        }
      ]

      const result = applyFilters(mockEmployees, filters)
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('John Doe')
    })
  })

  describe('applySorting', () => {
    it('sorts data by string field ascending', () => {
      const sorts: SortConfig[] = [
        {
          field: 'name',
          direction: 'asc'
        }
      ]

      const result = applySorting(mockEmployees, sorts)
      expect(result[0].name).toBe('Alice Brown')
      expect(result[result.length - 1].name).toBe('John Doe')
    })

    it('sorts data by string field descending', () => {
      const sorts: SortConfig[] = [
        {
          field: 'name',
          direction: 'desc'
        }
      ]

      const result = applySorting(mockEmployees, sorts)
      expect(result[0].name).toBe('John Doe')
      expect(result[result.length - 1].name).toBe('Alice Brown')
    })

    it('sorts data by number field', () => {
      const sorts: SortConfig[] = [
        {
          field: 'salary',
          direction: 'desc'
        }
      ]

      const result = applySorting(mockEmployees, sorts)
      expect(result[0].salary).toBe(92000)
      expect(result[result.length - 1].salary).toBe(65000)
    })

    it('sorts data by date field', () => {
      const sorts: SortConfig[] = [
        {
          field: 'hireDate',
          direction: 'asc'
        }
      ]

      const result = applySorting(mockEmployees, sorts)
      expect(result[0].hireDate).toBe('2020-03-22')
      expect(result[result.length - 1].hireDate).toBe('2023-02-14')
    })

    it('applies multiple sorts', () => {
      const sorts: SortConfig[] = [
        {
          field: 'department',
          direction: 'asc'
        },
        {
          field: 'salary',
          direction: 'desc'
        }
      ]

      const result = applySorting(mockEmployees, sorts)
      // Should sort by department first, then by salary within each department
      expect(result[0].department).toBe('Engineering')
      expect(result[0].salary).toBe(92000) // Bob Johnson
    })
  })

  describe('groupData', () => {
    it('groups data by single field', () => {
      const result = groupData(mockEmployees, ['department'])
      
      expect(result.has('Engineering')).toBe(true)
      expect(result.has('Marketing')).toBe(true)
      expect(result.has('Finance')).toBe(true)
      expect(result.has('HR')).toBe(true)
      
      expect(result.get('Engineering')).toHaveLength(2)
      expect(result.get('Marketing')).toHaveLength(1)
    })

    it('groups data by multiple fields', () => {
      const result = groupData(mockEmployees, ['department', 'location'])
      
      expect(result.has('Engineering')).toBe(true)
      
      const engineeringGroup = result.get('Engineering')
      expect(engineeringGroup).toBeInstanceOf(Map)
      expect((engineeringGroup as Map<string, any>).has('New York')).toBe(true)
    })

    it('returns original data when no grouping fields', () => {
      const result = groupData(mockEmployees, [])
      expect(result).toEqual(mockEmployees)
    })
  })

  describe('createGroupSummaries', () => {
    it('creates summaries for numeric fields', () => {
      const groupedData = new Map([
        ['Engineering', mockEmployees.filter(emp => emp.department === 'Engineering')]
      ])

      const result = createGroupSummaries(groupedData, mockColumns)
      
      expect(result.has('Engineering')).toBe(true)
      
      const engineeringSummary = result.get('Engineering')
      expect(engineeringSummary?.has('salary')).toBe(true)
      expect(engineeringSummary?.get('salary')).toBe(177000) // 85000 + 92000
    })

    it('handles empty groups', () => {
      const groupedData = new Map([
        ['Empty', []]
      ])

      const result = createGroupSummaries(groupedData, mockColumns)
      
      expect(result.has('Empty')).toBe(true)
      expect(result.get('Empty')?.get('salary')).toBe(0)
    })

    it('handles non-numeric fields', () => {
      const groupedData = new Map([
        ['Engineering', mockEmployees.filter(emp => emp.department === 'Engineering')]
      ])

      const result = createGroupSummaries(groupedData, mockColumns)
      
      const engineeringSummary = result.get('Engineering')
      expect(engineeringSummary?.has('name')).toBe(false) // Text fields shouldn't be summarized
    })
  })
})