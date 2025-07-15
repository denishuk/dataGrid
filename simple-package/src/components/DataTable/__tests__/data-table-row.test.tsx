import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTableRow } from '../data-table-row'
import { mockColumns, mockEmployees } from '../../../test/mocks/data'

describe('DataTableRow', () => {
  const defaultProps = {
    row: mockEmployees[0],
    columns: mockColumns,
    isSelected: false,
    showSelection: true,
    onRowSelect: vi.fn(),
    onRowEdit: vi.fn(),
    onRowDelete: vi.fn(),
    onCellEdit: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders row data', () => {
    render(<DataTableRow {...defaultProps} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john.doe@company.com')).toBeInTheDocument()
    expect(screen.getByText('Engineering')).toBeInTheDocument()
    expect(screen.getByText('$85,000')).toBeInTheDocument()
  })

  it('renders selection checkbox when showSelection is true', () => {
    render(<DataTableRow {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeInTheDocument()
  })

  it('does not render selection checkbox when showSelection is false', () => {
    render(<DataTableRow {...defaultProps} showSelection={false} />)
    
    const checkbox = screen.queryByRole('checkbox')
    expect(checkbox).not.toBeInTheDocument()
  })

  it('handles row selection', async () => {
    render(<DataTableRow {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    await waitFor(() => {
      expect(defaultProps.onRowSelect).toHaveBeenCalledWith(mockEmployees[0])
    })
  })

  it('shows selected state', () => {
    render(<DataTableRow {...defaultProps} isSelected={true} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('handles cell editing on double click', async () => {
    render(<DataTableRow {...defaultProps} />)
    
    const nameCell = screen.getByText('John Doe')
    fireEvent.doubleClick(nameCell)
    
    await waitFor(() => {
      expect(screen.getByRole('textbox')).toBeInTheDocument()
    })
  })

  it('handles actions dropdown', async () => {
    render(<DataTableRow {...defaultProps} />)
    
    const actionsButton = screen.getByRole('button', { name: /actions/i })
    fireEvent.click(actionsButton)
    
    await waitFor(() => {
      expect(screen.getByText('Edit')).toBeInTheDocument()
      expect(screen.getByText('Delete')).toBeInTheDocument()
    })
  })

  it('handles edit action', async () => {
    render(<DataTableRow {...defaultProps} />)
    
    const actionsButton = screen.getByRole('button', { name: /actions/i })
    fireEvent.click(actionsButton)
    
    await waitFor(() => {
      const editButton = screen.getByText('Edit')
      fireEvent.click(editButton)
    })
    
    await waitFor(() => {
      expect(defaultProps.onRowEdit).toHaveBeenCalledWith(mockEmployees[0])
    })
  })

  it('handles delete action', async () => {
    render(<DataTableRow {...defaultProps} />)
    
    const actionsButton = screen.getByRole('button', { name: /actions/i })
    fireEvent.click(actionsButton)
    
    await waitFor(() => {
      const deleteButton = screen.getByText('Delete')
      fireEvent.click(deleteButton)
    })
    
    await waitFor(() => {
      expect(defaultProps.onRowDelete).toHaveBeenCalledWith(mockEmployees[0])
    })
  })

  it('renders custom cell content', () => {
    const customColumns = [
      {
        ...mockColumns[0],
        cellRenderer: (value: any) => <span data-testid="custom-cell">{value}</span>
      }
    ]

    render(<DataTableRow {...defaultProps} columns={customColumns} />)
    
    expect(screen.getByTestId('custom-cell')).toBeInTheDocument()
  })

  it('handles pinned columns styling', () => {
    const pinnedColumns = [
      {
        ...mockColumns[0],
        pinned: 'left' as const
      }
    ]

    render(<DataTableRow {...defaultProps} columns={pinnedColumns} />)
    
    const cell = screen.getByText('1')
    expect(cell.closest('td')).toHaveClass('sticky', 'left-0')
  })
})