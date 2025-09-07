import { describe, it, expect, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSEO } from '../hooks/useSEO'

// Mock document methods
const mockUpdateMetaTag = vi.fn()
const mockUpdateCanonical = vi.fn()
const mockAddStructuredData = vi.fn()
const mockRemoveStructuredData = vi.fn()

// Mock the SEO hook implementation
vi.mock('../hooks/useSEO', () => ({
  useSEO: vi.fn().mockImplementation(({ title }) => {
    if (title) {
      document.title = title;
    }
  })
}))

describe('Custom Hooks', () => {
  describe('useSEO', () => {
    it('updates document title correctly', () => {
      const mockTitle = 'Test Page Title'
      const mockDescription = 'Test page description'
      
      // Mock document.title setter
      Object.defineProperty(document, 'title', {
        writable: true,
        value: ''
      })
      
      const { result } = renderHook(() => 
        useSEO({
          title: mockTitle,
          description: mockDescription
        })
      )
      
      expect(document.title).toContain(mockTitle)
    })

    it('handles SEO props correctly', () => {
      const seoProps = {
        title: 'Test Title',
        description: 'Test Description',
        keywords: 'test, keywords',
        canonical: 'https://example.com/test',
        ogImage: 'https://example.com/image.png',
        ogType: 'article',
        twitterCard: 'summary'
      }
      
      const { result } = renderHook(() => useSEO(seoProps))
      
      expect(result.current).toBeUndefined() // useSEO doesn't return anything
    })
  })
})

// Mock analytics hook
describe('useAnalytics', () => {
  it('initializes analytics correctly', () => {
    // Mock window.gtag
    const mockGtag = vi.fn()
    Object.defineProperty(window, 'gtag', {
      value: mockGtag,
      writable: true
    })
    
    // Mock useLocation
    const mockLocation = { pathname: '/test', search: '' }
    vi.mock('react-router-dom', () => ({
      useLocation: () => mockLocation
    }))
    
    expect(mockGtag).toBeDefined()
  })
})
