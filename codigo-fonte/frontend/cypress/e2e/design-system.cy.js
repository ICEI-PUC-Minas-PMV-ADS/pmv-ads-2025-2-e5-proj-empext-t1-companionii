describe('Design System Demo E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.viewport(1280, 720)
  })

  describe('Page Load and Layout', () => {
    it('should load the design system demo page', () => {
      cy.contains('Typography System').should('be.visible')
      cy.contains('Color Palette').should('be.visible')
      cy.contains('Components').should('be.visible')
    })

    it('should have proper page structure', () => {
      cy.get('body').should(
        'have.css',
        'background-color',
        'rgb(255, 255, 255)',
      )
      cy.get('[class*="min-h-screen"]').should('exist')
    })
  })

  describe('Typography System', () => {
    it('should display all heading levels', () => {
      cy.contains('Heading 1 - 48px Bold').should('be.visible')
      cy.contains('Heading 2 - 32px Bold').should('be.visible')
      cy.contains('Heading 3 - 24px SemiBold').should('be.visible')
      cy.contains('Heading 4 - 18px SemiBold').should('be.visible')
      cy.contains('Heading 5 - 16px SemiBold').should('be.visible')
    })

    it('should display body text styles', () => {
      cy.contains('Body Large - 16px Regular with 24px line height').should(
        'be.visible',
      )
      cy.contains('Body Medium - 14px Regular with 20px line height').should(
        'be.visible',
      )
      cy.contains('Body Small - 12px Regular with 16px line height').should(
        'be.visible',
      )
    })

    it('should have correct font families applied', () => {
      cy.contains('Heading 1').should('have.css', 'font-weight', '700')
      cy.contains('Body Large').should('have.css', 'font-weight', '400')
    })
  })

  describe('Color Palette Display', () => {
    it('should show primary color section', () => {
      cy.contains('Primary Colors').should('be.visible')
      cy.contains('#111111').should('be.visible')
      cy.contains('#000000').should('be.visible')
      cy.contains('#3D3D3D').should('be.visible')
    })

    it('should show semantic colors', () => {
      cy.contains('Semantic Colors').should('be.visible')
      cy.contains('#22C55E').should('be.visible')
      cy.contains('#EF4444').should('be.visible')
      cy.contains('#F59E0B').should('be.visible')
      cy.contains('#3B82F6').should('be.visible')
    })

    it('should display color swatches', () => {
      // Check if color divs exist and have proper backgrounds
      cy.get('[class*="bg-primary"]').first().should('be.visible')
      cy.get('[class*="bg-success"]').should('be.visible')
      cy.get('[class*="bg-error"]').should('be.visible')
    })
  })

  describe('Component Interactions', () => {
    it('should interact with buttons', () => {
      cy.contains('button', 'Primary Button')
        .should('be.visible')
        .and('have.class', 'btn-primary')
        .click()

      cy.contains('button', 'Secondary Button')
        .should('be.visible')
        .and('have.class', 'btn-secondary')

      cy.contains('button', 'Outline Button')
        .should('be.visible')
        .and('have.class', 'btn-outline')
    })

    it('should test button hover states', () => {
      cy.contains('button', 'Primary Button')
        .trigger('mouseover')
        .should('have.css', 'transition-property')
    })

    it('should interact with input fields', () => {
      cy.get('input[placeholder="Enter your name..."]')
        .should('be.visible')
        .type('John Doe')
        .should('have.value', 'John Doe')

      cy.get('input[placeholder="Enter your email..."]')
        .should('be.visible')
        .type('john@example.com')
        .should('have.value', 'john@example.com')
    })

    it('should test input focus states', () => {
      cy.get('input[placeholder="Enter your name..."]')
        .focus()
        .should('have.focus')
    })
  })

  describe('Card Components', () => {
    it('should display card variants', () => {
      cy.contains('Base Card')
        .parent()
        .should('have.class', 'card-base')
        .and('be.visible')

      cy.contains('Elevated Card')
        .parent()
        .should('have.class', 'card-elevated')
        .and('be.visible')
    })
  })

  describe('Status Badges', () => {
    it('should display all status types', () => {
      cy.contains('.status-success', 'Success').should('be.visible')
      cy.contains('.status-error', 'Error').should('be.visible')
      cy.contains('.status-warning', 'Warning').should('be.visible')
      cy.contains('.status-info', 'Info').should('be.visible')
    })
  })

  describe('Responsive Design', () => {
    it('should work on mobile viewport', () => {
      cy.viewport(375, 667)
      cy.contains('Typography System').should('be.visible')
      cy.contains('Primary Button').should('be.visible')
    })

    it('should work on tablet viewport', () => {
      cy.viewport(768, 1024)
      cy.contains('Color Palette').should('be.visible')
      cy.get('input[placeholder="Enter your name..."]').should('be.visible')
    })

    it('should adapt grid layouts on different screen sizes', () => {
      // Desktop
      cy.viewport(1280, 720)
      cy.get('[class*="md:grid-cols"]').should('exist')

      // Mobile
      cy.viewport(375, 667)
      cy.get('[class*="grid-cols-2"]').should('exist')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      cy.get('h1, h2, h3, h4, h5').should('have.length.greaterThan', 0)
    })

    it('should have accessible form inputs', () => {
      cy.get('input').should('have.attr', 'placeholder').and('not.be.empty')
    })
  })

  describe('Performance and Loading', () => {
    it('should load page quickly', () => {
      const start = Date.now()
      cy.visit('/')
      cy.contains('Typography System')
        .should('be.visible')
        .then(() => {
          const loadTime = Date.now() - start
          expect(loadTime).to.be.lessThan(3000) // Should load in less than 3s
        })
    })

    it('should have no console errors', () => {
      cy.visit('/', {
        onBeforeLoad(win) {
          cy.stub(win.console, 'error').as('consoleError')
        },
      })
      cy.get('@consoleError').should('not.have.been.called')
    })
  })
})
