import { describe, it, expect, vi, beforeEach } from 'vitest'
import { apiRequest, getQueryFn } from '../queryClient'

// Mock fetch
global.fetch = vi.fn()

describe('queryClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('apiRequest', () => {
    it('should make successful API request', async () => {
      const mockResponse = { data: 'test' }
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiRequest('/api/test', {
        method: 'GET',
      })

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('/api/test', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should handle POST request with body', async () => {
      const mockResponse = { success: true }
      const requestBody = { name: 'test' }

      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await apiRequest('/api/test', {
        method: 'POST',
        body: JSON.stringify(requestBody),
      })

      expect(result).toEqual(mockResponse)
      expect(fetch).toHaveBeenCalledWith('/api/test', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    })

    it('should throw on failed request', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(apiRequest('/api/test')).rejects.toThrow('Request failed')
    })
  })

  describe('getQueryFn', () => {
    it('should create query function that fetches data', async () => {
      const mockData = { items: [1, 2, 3] }
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      })

      const queryFn = getQueryFn({ on401: 'throw' })
      const result = await queryFn({ queryKey: ['/api/test'] })

      expect(result).toEqual(mockData)
    })

    it('should handle 401 with returnNull behavior', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
      })

      const queryFn = getQueryFn({ on401: 'returnNull' })
      const result = await queryFn({ queryKey: ['/api/test'] })

      expect(result).toBeNull()
    })

    it('should throw on 401 with throw behavior', async () => {
      ;(global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 401,
      })

      const queryFn = getQueryFn({ on401: 'throw' })
      
      await expect(queryFn({ queryKey: ['/api/test'] })).rejects.toThrow()
    })
  })
})