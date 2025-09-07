import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

// Mock the theme provider
vi.mock('../components/ThemeProvider', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}))

describe('UI Components', () => {
  describe('Button', () => {
    it('renders button with text', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
    })

    it('applies variant classes correctly', () => {
      render(<Button variant="destructive">Delete</Button>)
      const button = screen.getByRole('button', { name: 'Delete' })
      expect(button).toHaveClass('bg-destructive')
    })

    it('applies size classes correctly', () => {
      render(<Button size="lg">Large Button</Button>)
      const button = screen.getByRole('button', { name: 'Large Button' })
      expect(button).toHaveClass('h-11')
    })

    it('handles disabled state', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button', { name: 'Disabled Button' })
      expect(button).toBeDisabled()
    })
  })

  describe('Card', () => {
    it('renders card with title and content', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Card content</p>
          </CardContent>
        </Card>
      )
      
      expect(screen.getByText('Test Card')).toBeInTheDocument()
      expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('applies correct CSS classes', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test</CardTitle>
          </CardHeader>
          <CardContent>Content</CardContent>
        </Card>
      )
      
      const card = screen.getByText('Test').closest('[class*="rounded-lg"]')
      expect(card).toHaveClass('rounded-lg')
    })
  })
})
