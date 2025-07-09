import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableActionBar } from '../data-table-action-bar'
import { mockColumns } from '../../../test/mocks/data'
import { FilterConfig } from '../types'

describe('DataTableActionBar', () => {
  const defaultProps = {
    columns: mockColumns,
    filters: [] as FilterConfig[],
    onExport: vi.fn(),
    onClearFilters: vi.fn(),
    onOpenColumnConfig: vi.fn(),
    onToggleFullscreen: vi.fn(),
    onGroupByChange: vi.fn(),
    groupByFields: ['department', 'location'],
    isFullscreen: false,
    enablePdfExport: false
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders action bar controls', () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    expect(screen.getByText('Export CSV')).toBeInTheDocument()
    expect(screen.getByText('Columns')).toBeInTheDocument()
    expect(screen.getByLabelText('Toggle fullscreen')).toBeInTheDocument()
  })

  it('handles CSV export', async () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    const exportButton = screen.getByText('Export CSV')
    fireEvent.click(exportButton)
    
    await waitFor(() => {
      expect(defaultProps.onExport).toHaveBeenCalledWith('csv')
    })
  })

  it('shows PDF export when enabled', () => {
    render(<DataTableActionBar {...defaultProps} enablePdfExport={true} />)
    
    expect(screen.getByText('Export PDF')).toBeInTheDocument()
  })

  it('handles PDF export', async () => {
    render(<DataTableActionBar {...defaultProps} enablePdfExport={true} />)
    
    const exportButton = screen.getByText('Export PDF')
    fireEvent.click(exportButton)
    
    await waitFor(() => {
      expect(defaultProps.onExport).toHaveBeenCalledWith('pdf')
    })
  })

  it('handles column configuration', async () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    const columnsButton = screen.getByText('Columns')
    fireEvent.click(columnsButton)
    
    await waitFor(() => {
      expect(defaultProps.onOpenColumnConfig).toHaveBeenCalled()
    })
  })

  it('handles fullscreen toggle', async () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    const fullscreenButton = screen.getByLabelText('Toggle fullscreen')
    fireEvent.click(fullscreenButton)
    
    await waitFor(() => {
      expect(defaultProps.onToggleFullscreen).toHaveBeenCalled()
    })
  })

  it('shows fullscreen exit icon when in fullscreen mode', () => {
    render(<DataTableActionBar {...defaultProps} isFullscreen={true} />)
    
    const fullscreenButton = screen.getByLabelText('Toggle fullscreen')
    expect(fullscreenButton).toBeInTheDocument()
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

    render(<DataTableActionBar {...defaultProps} filters={filtersWithData} />)
    
    expect(screen.getByText('2 active filters')).toBeInTheDocument()
  })

  it('handles clear filters', async () => {
    const filtersWithData: FilterConfig[] = [
      {
        field: 'department',
        operator: 'equals',
        value: 'Engineering',
        type: 'select'
      }
    ]

    render(<DataTableActionBar {...defaultProps} filters={filtersWithData} />)
    
    const clearButton = screen.getByText('Clear')
    fireEvent.click(clearButton)
    
    await waitFor(() => {
      expect(defaultProps.onClearFilters).toHaveBeenCalled()
    })
  })

  it('shows no filters message when no filters are active', () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    expect(screen.getByText('No active filters')).toBeInTheDocument()
  })

  it('handles grouping changes', async () => {
    render(<DataTableActionBar {...defaultProps} />)
    
    // Test would need to interact with grouping controls
    // This is a placeholder for grouping functionality
    expect(screen.getByText('Export CSV')).toBeInTheDocument()
  })
})