// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('login', (email = 'test@example.com', password = 'password123') => {
  cy.session('userSession', () => {
    cy.visit('/login')
    cy.get('input[type="email"]').type(email)
    cy.get('input[type="password"]').type(password)
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})

Cypress.Commands.add('createTransaction', (transaction) => {
  cy.get('button').contains('Nouvelle transaction').click()
  cy.get('input[name="title"]').type(transaction.title)
  if (transaction.description) {
    cy.get('textarea[name="description"]').type(transaction.description)
  }
  cy.get('input[name="amount"]').type(transaction.amount.toString())
  cy.get('select[name="type"]').select(transaction.type)
  cy.get('select[name="category"]').select(transaction.category)
  if (transaction.date) {
    cy.get('input[name="date"]').type(transaction.date)
  }
  cy.get('button[type="submit"]').click()
})