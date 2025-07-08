import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableColumnConfig } from '../data-table-column-config'
import { mockColumns } from '../../../test/mocks/data'

describe('DataTableColumnConfig', () => {
  const defaultProps = {
    columns: mockColumns,
    onColumnChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders column configuration controls', () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Department')).toBeInTheDocument()
  })

  it('handles column visibility toggle', async () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    const visibilityCheckbox = screen.getAllByRole('checkbox')[0]
    fireEvent.click(visibilityCheckbox)
    
    await waitFor(() => {
      expect(defaultProps.onColumnChange).toHaveBeenCalled()
    })
  })

  it('handles column pinning', async () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    const pinningSelect = screen.getAllByRole('combobox')[0]
    fireEvent.click(pinningSelect)
    
    await waitFor(() => {
      const leftOption = screen.getByText('Pin Left')
      fireEvent.click(leftOption)
    })
    
    await waitFor(() => {
      expect(defaultProps.onColumnChange).toHaveBeenCalled()
    })
  })

  it('handles column width changes', async () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    const widthInput = screen.getAllByRole('spinbutton')[0]
    fireEvent.change(widthInput, { target: { value: '200' } })
    
    await waitFor(() => {
      expect(defaultProps.onColumnChange).toHaveBeenCalled()
    })
  })

  it('shows column properties correctly', () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    // Check that column properties are displayed
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    
    // Check that checkboxes reflect column state
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(mockColumns.length)
  })

  it('handles drag and drop reordering', async () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    const firstColumn = screen.getByText('ID').closest('div')
    const secondColumn = screen.getByText('Name').closest('div')
    
    // Simulate drag start
    fireEvent.dragStart(firstColumn!, { dataTransfer: { setData: vi.fn() } })
    
    // Simulate drop
    fireEvent.drop(secondColumn!, { dataTransfer: { getData: vi.fn().mockReturnValue('0') } })
    
    await waitFor(() => {
      expect(defaultProps.onColumnChange).toHaveBeenCalled()
    })
  })

  it('handles reset to defaults', async () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    const resetButton = screen.getByText('Reset to Defaults')
    fireEvent.click(resetButton)
    
    await waitFor(() => {
      expect(defaultProps.onColumnChange).toHaveBeenCalled()
    })
  })

  it('shows column count', () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    expect(screen.getByText(`${mockColumns.length} columns`)).toBeInTheDocument()
  })

  it('handles column type display', () => {
    render(<DataTableColumnConfig {...defaultProps} />)
    
    // Should show column types
    expect(screen.getByText('Number')).toBeInTheDocument() // ID column
    expect(screen.getByText('Text')).toBeInTheDocument() // Name column
    expect(screen.getByText('Select')).toBeInTheDocument() // Department column
  })
})