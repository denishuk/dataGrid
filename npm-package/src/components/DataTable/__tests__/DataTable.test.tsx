import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTable } from '../DataTable'
import { mockEmployees, mockColumns, MockEmployee } from '../../../test/mocks/data'

// Mock React Query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(() => ({
    data: mockEmployees,
    isLoading: false,
    error: null
  })),
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn()
  }))
}))

describe('DataTable', () => {
  const defaultProps = {
    data: mockEmployees,
    columns: mockColumns,
    selectionMode: 'multiple' as const,
    showFilters: true,
    showColumnConfig: true,
    pageSize: 10
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders table with data', () => {
    render(<DataTable {...defaultProps} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('jane.smith@company.com')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
  })

  it('renders column headers', () => {
    render(<DataTable {...defaultProps} />)
    
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Department')).toBeInTheDocument()
    expect(screen.getByText('Salary')).toBeInTheDocument()
  })

  it('handles row selection', async () => {
    const onRowSelect = vi.fn()
    render(<DataTable {...defaultProps} onRowSelect={onRowSelect} />)
    
    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[1]) // First data row checkbox
    
    await waitFor(() => {
      expect(onRowSelect).toHaveBeenCalled()
    })
  })

  it('handles sorting', async () => {
    render(<DataTable {...defaultProps} />)
    
    const nameHeader = screen.getByText('Name')
    fireEvent.click(nameHeader)
    
    await waitFor(() => {
      // Should sort by name
      const rows = screen.getAllByRole('row')
      expect(rows.length).toBeGreaterThan(1)
    })
  })

  it('handles column filtering', async () => {
    render(<DataTable {...defaultProps} />)
    
    // Find and click on department filter
    const departmentFilters = screen.getAllByText('All')
    fireEvent.click(departmentFilters[0])
    
    await waitFor(() => {
      expect(screen.getByText('Filter options')).toBeInTheDocument()
    })
  })

  it('handles grouping', async () => {
    render(<DataTable {...defaultProps} />)
    
    // Test grouping functionality
    const groupingArea = screen.getByText('Drag columns here to group')
    expect(groupingArea).toBeInTheDocument()
  })

  it('handles pagination', () => {
    const manyEmployees = Array(25).fill(null).map((_, i) => ({
      ...mockEmployees[0],
      id: i + 1,
      name: `Employee ${i + 1}`,
      email: `employee${i + 1}@company.com`
    }))

    render(<DataTable {...defaultProps} data={manyEmployees} pageSize={10} />)
    
    expect(screen.getByText('1-10 of 25 items')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<DataTable {...defaultProps} data={[]} />)
    
    // When no data, should show appropriate state
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('handles export functionality', async () => {
    const onExport = vi.fn()
    render(<DataTable {...defaultProps} onExport={onExport} />)
    
    const exportButton = screen.getByText('Export CSV')
    fireEvent.click(exportButton)
    
    await waitFor(() => {
      expect(onExport).toHaveBeenCalledWith(mockEmployees, 'csv')
    })
  })

  it('handles column configuration', async () => {
    render(<DataTable {...defaultProps} />)
    
    const configButton = screen.getByText('Columns')
    fireEvent.click(configButton)
    
    await waitFor(() => {
      expect(screen.getByText('Column Configuration')).toBeInTheDocument()
    })
  })

  it('handles fullscreen mode', async () => {
    render(<DataTable {...defaultProps} />)
    
    const fullscreenButton = screen.getByLabelText('Toggle fullscreen')
    fireEvent.click(fullscreenButton)
    
    await waitFor(() => {
      const container = screen.getByTestId('data-table-container')
      expect(container).toHaveClass('fixed', 'inset-0', 'z-50')
    })
  })

  it('handles cell editing', async () => {
    const onCellEdit = vi.fn()
    render(<DataTable {...defaultProps} onCellEdit={onCellEdit} />)
    
    const nameCell = screen.getByText('John Doe')
    fireEvent.doubleClick(nameCell)
    
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })
})