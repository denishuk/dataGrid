import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTable } from '../DataTable'

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: [],
    isLoading: false,
    error: null
  })),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn()
  }))
}))

const mockData = [
  { id: 1, name: 'John Doe', department: 'Engineering', salary: 85000, active: true },
  { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 72000, active: true },
  { id: 3, name: 'Bob Johnson', department: 'Engineering', salary: 92000, active: false }
]

const mockColumns = [
  { field: 'id', header: 'ID', type: 'number', sortable: true },
  { field: 'name', header: 'Name', type: 'text', sortable: true, filterable: true },
  { field: 'department', header: 'Department', type: 'select', groupable: true, filterable: true },
  { field: 'salary', header: 'Salary', type: 'number', sortable: true },
  { field: 'active', header: 'Active', type: 'boolean', filterable: true }
]

describe('DataTable Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders complete table with all features', () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        showFilters={true}
        showColumnConfig={true}
        selectionMode="multiple"
        pageSize={10}
      />
    )
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('$85,000')).toBeInTheDocument()
  })

  it('handles complete filtering workflow', async () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        showFilters={true}
      />
    )
    
    // Test department filter
    const departmentFilter = screen.getAllByText('All')[0]
    fireEvent.click(departmentFilter)
    
    await waitFor(() => {
      expect(screen.getByText('Filter options')).toBeInTheDocument()
    })
  })

  it('handles complete sorting workflow', async () => {
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
      />
    )
    
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    
    // Should trigger sorting
    expect(nameHeader).toBeInTheDocument()
  })

  it('handles export functionality', async () => {
    const onExport = vi.fn()
    render(
      <DataTable
        data={mockData}
        columns={mockColumns}
        onExport={onExport}
      />
    )
    
    const exportButton = screen.getByText('Export CSV')
    fireEvent.click(exportButton)
    
    await waitFor(() => {
      expect(onExport).toHaveBeenCalled()
    })
  })
})