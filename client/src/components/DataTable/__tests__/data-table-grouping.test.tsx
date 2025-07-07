import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableGroupingArea } from '../data-table-grouping-area'
import { mockColumns } from '../../../test/mocks/data'

describe('DataTableGroupingArea', () => {
  const defaultProps = {
    columns: mockColumns,
    onGroupByChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders grouping area with drop zone', () => {
    render(<DataTableGroupingArea {...defaultProps} />)
    
    expect(screen.getByText('Drag columns here to group')).toBeInTheDocument()
  })

  it('shows grouping badges when columns are grouped', () => {
    render(<DataTableGroupingArea {...defaultProps} groupBy={['department', 'location']} />)
    
    expect(screen.getByText('Department')).toBeInTheDocument()
    expect(screen.getByText('Location')).toBeInTheDocument()
  })

  it('handles removing a grouping badge', async () => {
    render(<DataTableGroupingArea {...defaultProps} groupBy={['department']} />)
    
    const removeButton = screen.getByLabelText('Remove Department grouping')
    fireEvent.click(removeButton)
    
    await waitFor(() => {
      expect(defaultProps.onGroupByChange).toHaveBeenCalledWith([])
    })
  })

  it('handles drag and drop reordering', async () => {
    render(<DataTableGroupingArea {...defaultProps} groupBy={['department', 'location']} />)
    
    const departmentBadge = screen.getByText('Department').closest('div')
    const locationBadge = screen.getByText('Location').closest('div')
    
    // Simulate drag start
    fireEvent.dragStart(departmentBadge!, { dataTransfer: { setData: vi.fn() } })
    
    // Simulate drop
    fireEvent.drop(locationBadge!, { dataTransfer: { getData: vi.fn().mockReturnValue('0') } })
    
    await waitFor(() => {
      expect(defaultProps.onGroupByChange).toHaveBeenCalled()
    })
  })

  it('handles drag over events', async () => {
    render(<DataTableGroupingArea {...defaultProps} groupBy={['department']} />)
    
    const dropZone = screen.getByText('Drag columns here to group').closest('div')
    
    fireEvent.dragOver(dropZone!, { preventDefault: vi.fn() })
    
    expect(dropZone).toHaveClass('border-blue-300')
  })

  it('clears all grouping when clear button is clicked', async () => {
    render(<DataTableGroupingArea {...defaultProps} groupBy={['department', 'location']} />)
    
    const clearButton = screen.getByText('Clear All')
    fireEvent.click(clearButton)
    
    await waitFor(() => {
      expect(defaultProps.onGroupByChange).toHaveBeenCalledWith(null)
    })
  })
})