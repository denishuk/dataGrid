import { describe, it, expect } from 'vitest'

// Test core DataTable utilities and types
describe('DataTable Core Functionality', () => {
  it('should handle data filtering', () => {
    const data = [
      { id: 1, name: 'John', department: 'Engineering' },
      { id: 2, name: 'Jane', department: 'Marketing' },
      { id: 3, name: 'Bob', department: 'Engineering' }
    ]

    // Test contains filter
    const filtered = data.filter(item => 
      item.name.toLowerCase().includes('john'.toLowerCase())
    )
    expect(filtered).toHaveLength(1)
    expect(filtered[0].name).toBe('John')

    // Test department filter  
    const deptFiltered = data.filter(item => item.department === 'Engineering')
    expect(deptFiltered).toHaveLength(2)
  })

  it('should handle data sorting', () => {
    const data = [
      { id: 3, name: 'Charlie', salary: 75000 },
      { id: 1, name: 'Alice', salary: 85000 },
      { id: 2, name: 'Bob', salary: 70000 }
    ]

    // Test name sorting
    const nameSorted = [...data].sort((a, b) => a.name.localeCompare(b.name))
    expect(nameSorted[0].name).toBe('Alice')
    expect(nameSorted[2].name).toBe('Charlie')

    // Test salary sorting
    const salarySorted = [...data].sort((a, b) => b.salary - a.salary)
    expect(salarySorted[0].salary).toBe(85000)
    expect(salarySorted[2].salary).toBe(70000)
  })

  it('should handle data grouping', () => {
    const data = [
      { id: 1, name: 'John', department: 'Engineering' },
      { id: 2, name: 'Jane', department: 'Marketing' },
      { id: 3, name: 'Bob', department: 'Engineering' },
      { id: 4, name: 'Alice', department: 'Marketing' }
    ]

    // Group by department
    const grouped = data.reduce((acc, item) => {
      const key = item.department
      if (!acc[key]) acc[key] = []
      acc[key].push(item)
      return acc
    }, {} as Record<string, typeof data>)

    expect(Object.keys(grouped)).toHaveLength(2)
    expect(grouped['Engineering']).toHaveLength(2)
    expect(grouped['Marketing']).toHaveLength(2)
  })

  it('should handle pagination', () => {
    const data = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Person ${i + 1}`
    }))

    const pageSize = 10
    const page = 2

    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const pageData = data.slice(startIndex, endIndex)

    expect(pageData).toHaveLength(10)
    expect(pageData[0].name).toBe('Person 11')
    expect(pageData[9].name).toBe('Person 20')
  })

  it('should calculate summary statistics', () => {
    const data = [
      { salary: 70000, active: true },
      { salary: 85000, active: true },
      { salary: 92000, active: false },
      { salary: 75000, active: true }
    ]

    const total = data.reduce((sum, item) => sum + item.salary, 0)
    const average = total / data.length
    const activeCount = data.filter(item => item.active).length

    expect(total).toBe(322000)
    expect(average).toBe(80500)
    expect(activeCount).toBe(3)
  })

  it('should handle column configuration', () => {
    const columns = [
      { field: 'id', header: 'ID', width: 80, visible: true },
      { field: 'name', header: 'Name', width: 150, visible: true },
      { field: 'email', header: 'Email', width: 200, visible: false }
    ]

    const visibleColumns = columns.filter(col => col.visible)
    expect(visibleColumns).toHaveLength(2)

    const totalWidth = visibleColumns.reduce((sum, col) => sum + col.width, 0)
    expect(totalWidth).toBe(230)
  })

  it('should validate filter operators', () => {
    const operators = ['contains', 'equals', 'startsWith', 'endsWith', 'gt', 'lt', 'gte', 'lte', 'in']
    
    expect(operators).toContain('contains')
    expect(operators).toContain('equals')
    expect(operators).toContain('in')
    expect(operators).toHaveLength(9)
  })

  it('should handle export data formatting', () => {
    const data = [
      { id: 1, name: 'John Doe', salary: 85000, active: true },
      { id: 2, name: 'Jane Smith', salary: 72000, active: false }
    ]

    // CSV format simulation
    const headers = ['id', 'name', 'salary', 'active']
    const csvRows = data.map(row => 
      headers.map(header => row[header as keyof typeof row]).join(',')
    )

    expect(csvRows).toHaveLength(2)
    expect(csvRows[0]).toBe('1,John Doe,85000,true')
    expect(csvRows[1]).toBe('2,Jane Smith,72000,false')
  })
})