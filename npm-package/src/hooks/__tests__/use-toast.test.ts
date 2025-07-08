import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useToast, toast } from '../use-toast'

describe('useToast', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty toasts', () => {
    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toEqual([])
  })

  it('should add a toast', () => {
    act(() => {
      toast({ title: 'Test Toast', description: 'Test description' })
    })

    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0].title).toBe('Test Toast')
  })

  it('should dismiss a toast', () => {
    let toastId: string

    act(() => {
      const toastResult = toast({ title: 'Test Toast' })
      toastId = toastResult.id
    })

    const { result } = renderHook(() => useToast())
    expect(result.current.toasts).toHaveLength(1)

    act(() => {
      result.current.dismiss(toastId)
    })

    // Toast should be marked as dismissed but still present initially
    expect(result.current.toasts).toHaveLength(1)
  })

  it('should handle toast with action', () => {
    const action = { altText: 'Undo', onClick: vi.fn() }
    
    act(() => {
      toast({ title: 'Test Toast', action })
    })

    const { result } = renderHook(() => useToast())
    expect(result.current.toasts[0].action).toBeDefined()
  })
})