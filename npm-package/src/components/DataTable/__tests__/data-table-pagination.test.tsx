import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { DataTablePagination } from '../data-table-pagination'

describe('DataTablePagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    pageSize: 10,
    totalItems: 47,
    onPageChange: vi.fn(),
    onPageSizeChange: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders pagination controls', () => {
    render(<DataTablePagination {...defaultProps} />)
    
    expect(screen.getByText('1-10 of 47 items')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('handles page navigation', async () => {
    render(<DataTablePagination {...defaultProps} />)
    
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2)
    })
  })

  it('handles previous page navigation', async () => {
    render(<DataTablePagination {...defaultProps} currentPage={3} />)
    
    const previousButton = screen.getByText('Previous')
    fireEvent.click(previousButton)
    
    await waitFor(() => {
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(2)
    })
  })

  it('disables previous button on first page', () => {
    render(<DataTablePagination {...defaultProps} currentPage={1} />)
    
    const previousButton = screen.getByText('Previous')
    expect(previousButton).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<DataTablePagination {...defaultProps} currentPage={5} />)
    
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('handles page size change', async () => {
    render(<DataTablePagination {...defaultProps} />)
    
    const pageSizeSelect = screen.getByDisplayValue('10')
    fireEvent.change(pageSizeSelect, { target: { value: '25' } })
    
    await waitFor(() => {
      expect(defaultProps.onPageSizeChange).toHaveBeenCalledWith(25)
    })
  })

  it('shows correct item range for different pages', () => {
    render(<DataTablePagination {...defaultProps} currentPage={3} />)
    
    expect(screen.getByText('21-30 of 47 items')).toBeInTheDocument()
  })

  it('shows correct item range for last page', () => {
    render(<DataTablePagination {...defaultProps} currentPage={5} />)
    
    expect(screen.getByText('41-47 of 47 items')).toBeInTheDocument()
  })

  it('renders page numbers', () => {
    render(<DataTablePagination {...defaultProps} />)
    
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })

  it('handles direct page navigation', async () => {
    render(<DataTablePagination {...defaultProps} />)
    
    const pageButton = screen.getByText('3')
    fireEvent.click(pageButton)
    
    await waitFor(() => {
      expect(defaultProps.onPageChange).toHaveBeenCalledWith(3)
    })
  })
})