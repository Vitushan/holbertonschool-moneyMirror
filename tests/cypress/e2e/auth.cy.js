describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should display login form', () => {
    cy.get('h1').should('contain', 'MoneyMirror')
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('contain', 'Se connecter')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@email.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    cy.get('.text-red-600').should('contain', 'Email ou mot de passe incorrect')
  })

  it('should redirect to dashboard after successful login', () => {
    // This test would require a test user to be set up
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // Mock successful login or create test user
    cy.url().should('include', '/dashboard')
  })

  it('should navigate to registration page', () => {
    cy.get('a').contains("S'inscrire").click()
    cy.url().should('include', '/register')
  })
})