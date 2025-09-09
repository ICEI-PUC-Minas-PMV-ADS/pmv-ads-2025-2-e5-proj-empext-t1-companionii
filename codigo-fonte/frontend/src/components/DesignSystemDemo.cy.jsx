import DesignSystemDemo from './DesignSystemDemo'

describe('DesignSystemDemo Component Tests', () => {
  it('should mount and display typography section', () => {
    cy.mount(<DesignSystemDemo />)
    cy.contains('Typography System').should('be.visible')
    cy.contains('Heading 1 - 48px Bold').should('be.visible')
  })

  it('should display all button variants', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('button', 'Primary Button')
      .should('be.visible')
      .and('have.class', 'btn-primary')

    cy.contains('button', 'Secondary Button')
      .should('be.visible')
      .and('have.class', 'btn-secondary')

    cy.contains('button', 'Outline Button')
      .should('be.visible')
      .and('have.class', 'btn-outline')
  })

  it('should handle button interactions', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('button', 'Primary Button').click().should('be.visible')
  })

  it('should display color palette correctly', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('Color Palette').should('be.visible')
    cy.contains('Primary Colors').should('be.visible')
    cy.contains('#111111').should('be.visible')
    cy.contains('#22C55E').should('be.visible')
  })

  it('should render input fields and allow typing', () => {
    cy.mount(<DesignSystemDemo />)

    cy.get('input[placeholder="Enter your name..."]')
      .should('be.visible')
      .type('Test User')
      .should('have.value', 'Test User')
  })

  it('should display cards with correct classes', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('Base Card').parent().should('have.class', 'card-base')

    cy.contains('Elevated Card').parent().should('have.class', 'card-elevated')
  })

  it('should show status badges', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('.status-success', 'Success').should('be.visible')
    cy.contains('.status-error', 'Error').should('be.visible')
    cy.contains('.status-warning', 'Warning').should('be.visible')
    cy.contains('.status-info', 'Info').should('be.visible')
  })

  it('should have responsive grid classes', () => {
    cy.mount(<DesignSystemDemo />)

    cy.get('[class*="grid"]').should('exist')
    cy.get('[class*="md:grid-cols"]').should('exist')
  })

  it('should apply correct typography classes', () => {
    cy.mount(<DesignSystemDemo />)

    cy.contains('Heading 1').should('have.class', 'text-heading-1')
    cy.contains('Body Large').should('have.class', 'text-body-large')
  })
})
