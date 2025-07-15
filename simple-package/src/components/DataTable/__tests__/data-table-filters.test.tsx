import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableFilters } from '../data-table-filters'
import { mockColumns, MockEmployee } from '../../../test/mocks/data'
import { FilterConfig } from '../types'

describe('DataTableFilters', () => {
  const defaultProps = {
    columns: mockColumns,
    filters: [] as FilterConfig[],
    onAddFilter: vi.fn(),
    onRemoveFilter: vi.fn(),
    onClearFilters: vi.fn(),
    isExpanded: false,
    onToggleExpanded: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders filter controls', () => {
    render(<DataTableFilters {...defaultProps} />)
    
    expect(screen.getByText('Add Filter')).toBeInTheDocument()
  })

  it('handles adding a filter', async () => {
    render(<DataTableFilters {...defaultProps} />)
    
    const addFilterButton = screen.getByText('Add Filter')
    fireEvent.click(addFilterButton)
    
    await waitFor(() => {
      expect(screen.getByText('Select field')).toBeInTheDocument()
    })
  })

  it('handles removing a filter', async () => {
    const filtersWithData: FilterConfig[] = [
      {
        field: 'department',
        operator: 'equals',
        value: 'Engineering',
        type: 'select'
      }
    ]

    render(<DataTableFilters {...defaultProps} filters={filtersWithData} />)
    
    const removeButton = screen.getByLabelText('Remove filter')
    fireEvent.click(removeButton)
    
    await waitFor(() => {
      expect(defaultProps.onRemoveFilter).toHaveBeenCalledWith('department')
    })
  })

  it('handles clearing all filters', async () => {
    const filtersWithData: FilterConfig[] = [
      {
        field: 'department',
        operator: 'equals',
        value: 'Engineering',
        type: 'select'
      }
    ]

    render(<DataTableFilters {...defaultProps} filters={filtersWithData} />)
    
    const clearAllButton = screen.getByText('Clear All')
    fireEvent.click(clearAllButton)
    
    await waitFor(() => {
      expect(defaultProps.onClearFilters).toHaveBeenCalled()
    })
  })

  it('handles filter expansion toggle', async () => {
    render(<DataTableFilters {...defaultProps} />)
    
    const toggleButton = screen.getByText('Add Filter')
    fireEvent.click(toggleButton)
    
    await waitFor(() => {
      expect(defaultProps.onToggleExpanded).toHaveBeenCalled()
    })
  })

  it('displays active filters count', () => {
    const filtersWithData: FilterConfig[] = [
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

    render(<DataTableFilters {...defaultProps} filters={filtersWithData} />)
    
    expect(screen.getByText('2 active filters')).toBeInTheDocument()
  })
})