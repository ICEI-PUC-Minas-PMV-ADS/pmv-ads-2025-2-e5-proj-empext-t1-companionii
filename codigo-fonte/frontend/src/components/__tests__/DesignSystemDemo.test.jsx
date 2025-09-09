import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DesignSystemDemo from '../DesignSystemDemo'

describe('DesignSystemDemo', () => {
  beforeEach(() => {
    render(<DesignSystemDemo />)
  })

  describe('Typography Section', () => {
    it('should render all heading styles', () => {
      expect(screen.getByText('Heading 1 - 48px Bold')).toBeInTheDocument()
      expect(screen.getByText('Heading 2 - 32px Bold')).toBeInTheDocument()
      expect(screen.getByText('Heading 3 - 24px SemiBold')).toBeInTheDocument()
      expect(screen.getByText('Heading 4 - 18px SemiBold')).toBeInTheDocument()
      expect(screen.getByText('Heading 5 - 16px SemiBold')).toBeInTheDocument()
    })

    it('should render body text styles', () => {
      expect(
        screen.getByText('Body Large - 16px Regular with 24px line height'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Body Medium - 14px Regular with 20px line height'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Body Small - 12px Regular with 16px line height'),
      ).toBeInTheDocument()
    })

    it('should apply correct CSS classes to typography', () => {
      const heading1 = screen.getByText('Heading 1 - 48px Bold')
      expect(heading1).toHaveClass('text-heading-1')

      const bodyLarge = screen.getByText(
        'Body Large - 16px Regular with 24px line height',
      )
      expect(bodyLarge).toHaveClass('text-body-large')
    })
  })

  describe('Color Palette Section', () => {
    it('should render color palette sections', () => {
      expect(screen.getByText('Primary Colors')).toBeInTheDocument()
      expect(screen.getByText('Semantic Colors')).toBeInTheDocument()
      expect(screen.getByText('Gray Scale')).toBeInTheDocument()
    })

    it('should display color hex codes', () => {
      expect(screen.getByText('#111111')).toBeInTheDocument()
      expect(screen.getByText('#22C55E')).toBeInTheDocument()
      expect(screen.getByText('#EF4444')).toBeInTheDocument()
    })
  })

  describe('Components Section', () => {
    it('should render all button variants', () => {
      expect(screen.getByText('Primary Button')).toBeInTheDocument()
      expect(screen.getByText('Secondary Button')).toBeInTheDocument()
      expect(screen.getByText('Outline Button')).toBeInTheDocument()
    })

    it('should apply correct button classes', () => {
      const primaryButton = screen.getByText('Primary Button')
      expect(primaryButton).toHaveClass('btn-primary')

      const secondaryButton = screen.getByText('Secondary Button')
      expect(secondaryButton).toHaveClass('btn-secondary')

      const outlineButton = screen.getByText('Outline Button')
      expect(outlineButton).toHaveClass('btn-outline')
    })

    it('should render card components', () => {
      expect(screen.getByText('Base Card')).toBeInTheDocument()
      expect(screen.getByText('Elevated Card')).toBeInTheDocument()
    })

    it('should apply correct card classes', () => {
      const baseCard = screen.getByText('Base Card').closest('div')
      expect(baseCard).toHaveClass('card-base')

      const elevatedCard = screen.getByText('Elevated Card').closest('div')
      expect(elevatedCard).toHaveClass('card-elevated')
    })

    it('should render input fields with placeholders', () => {
      expect(
        screen.getByPlaceholderText('Enter your name...'),
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Enter your email...'),
      ).toBeInTheDocument()
    })

    it('should render status badges', () => {
      expect(screen.getByText('Status Badges')).toBeInTheDocument()
      const badges = screen.getAllByText('Success')
      expect(badges.length).toBeGreaterThan(0)
      expect(screen.getAllByText('Error').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Warning').length).toBeGreaterThan(0)
      expect(screen.getAllByText('Info').length).toBeGreaterThan(0)
    })
  })

  describe('Interactivity', () => {
    it('should allow typing in input fields', async () => {
      const user = userEvent.setup()
      const nameInput = screen.getByPlaceholderText('Enter your name...')

      await user.type(nameInput, 'John Doe')
      expect(nameInput).toHaveValue('John Doe')
    })

    it('should handle button clicks', async () => {
      const user = userEvent.setup()
      const primaryButton = screen.getByText('Primary Button')

      await user.click(primaryButton)
      // Add assertions for click behavior when implemented
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive grid classes', () => {
      const colorGrid = screen.getByText('Primary').closest('div').parentElement
      expect(colorGrid).toHaveClass('grid')
      expect(colorGrid).toHaveClass('md:grid-cols-5')
    })
  })
})
