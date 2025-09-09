import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App Component', () => {
  it('should render without crashing', () => {
    render(<App />)
  })

  it('should render the design system demo', () => {
    render(<App />)

    // Check if main sections are rendered
    expect(screen.getByText('Typography System')).toBeInTheDocument()
    expect(screen.getByText('Color Palette')).toBeInTheDocument()
    expect(screen.getByText('Components')).toBeInTheDocument()
  })

  it('should have proper layout classes', () => {
    const { container } = render(<App />)

    const appWrapper = container.firstChild
    expect(appWrapper).toHaveClass('min-h-screen')
    expect(appWrapper).toHaveClass('bg-gray-50')
  })

  it('should render all button components', () => {
    render(<App />)

    expect(screen.getByText('Primary Button')).toBeInTheDocument()
    expect(screen.getByText('Secondary Button')).toBeInTheDocument()
    expect(screen.getByText('Outline Button')).toBeInTheDocument()
  })
})
