import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableColumnFilter } from '../data-table-column-filter'
import { mockColumns, mockEmployees } from '../../../test/mocks/data'
import { FilterConfig } from '../types'

describe('DataTableColumnFilter', () => {
  const defaultProps = {
    column: mockColumns[3], // Department column
    data: mockEmployees,
    onFilterChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders filter button for filterable column', () => {
    render(<DataTableColumnFilter {...defaultProps} />)
    
    expect(screen.getByText('All')).toBeInTheDocument()
  })

  it('opens filter dropdown on click', async () => {
    render(<DataTableColumnFilter {...defaultProps} />)
    
    const filterButton = screen.getByText('All')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      expect(screen.getByText('Filter options')).toBeInTheDocument()
    })
  })

  it('shows filter options for select type', async () => {
    render(<DataTableColumnFilter {...defaultProps} />)
    
    const filterButton = screen.getByText('All')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      expect(screen.getByText('Engineering')).toBeInTheDocument()
      expect(screen.getByText('Marketing')).toBeInTheDocument()
      expect(screen.getByText('Finance')).toBeInTheDocument()
      expect(screen.getByText('HR')).toBeInTheDocument()
    })
  })

  it('handles multiselect filter changes', async () => {
    render(<DataTableColumnFilter {...defaultProps} />)
    
    const filterButton = screen.getByText('All')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      const engineeringCheckbox = screen.getByLabelText('Engineering')
      fireEvent.click(engineeringCheckbox)
    })
    
    await waitFor(() => {
      expect(defaultProps.onFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          field: 'department',
          operator: 'in',
          value: ['Engineering'],
          type: 'select'
        })
      )
    })
  })

  it('handles text filter input', async () => {
    const textColumn = mockColumns[1] // Name column
    render(<DataTableColumnFilter {...defaultProps} column={textColumn} />)
    
    const filterButton = screen.getByText('All')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      const textInput = screen.getByPlaceholderText('Filter by name...')
      fireEvent.change(textInput, { target: { value: 'John' } })
    })
    
    await waitFor(() => {
      expect(defaultProps.onFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          field: 'name',
          operator: 'contains',
          value: 'John',
          type: 'text'
        })
      )
    })
  })

  it('handles boolean filter', async () => {
    const booleanColumn = mockColumns[5] // Active column
    render(<DataTableColumnFilter {...defaultProps} column={booleanColumn} />)
    
    const filterButton = screen.getByText('All')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      const trueCheckbox = screen.getByLabelText('True')
      fireEvent.click(trueCheckbox)
    })
    
    await waitFor(() => {
      expect(defaultProps.onFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          field: 'active',
          operator: 'in',
          value: [true],
          type: 'boolean'
        })
      )
    })
  })

  it('clears filter when clear button is clicked', async () => {
    const existingFilter: FilterConfig = {
      field: 'department',
      operator: 'in',
      value: ['Engineering'],
      type: 'select'
    }

    render(<DataTableColumnFilter {...defaultProps} filter={existingFilter} />)
    
    const filterButton = screen.getByText('1 selected')
    fireEvent.click(filterButton)
    
    await waitFor(() => {
      const clearButton = screen.getByText('Clear')
      fireEvent.click(clearButton)
    })
    
    await waitFor(() => {
      expect(defaultProps.onFilterChange).toHaveBeenCalledWith(null)
    })
  })

  it('displays filter count when items are selected', () => {
    const existingFilter: FilterConfig = {
      field: 'department',
      operator: 'in',
      value: ['Engineering', 'Marketing'],
      type: 'select'
    }

    render(<DataTableColumnFilter {...defaultProps} filter={existingFilter} />)
    
    expect(screen.getByText('2 selected')).toBeInTheDocument()
  })
})