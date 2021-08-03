Cypress.Commands.add('loginWith', ({ email, password }) =>
    cy.get('form').within(() => {
        cy.get(`input[type="email"]`).type('{selectall}{backspace}').type(email)
        cy.get(`input[type="password"]`).type('{selectall}{backspace}').type(password)
        cy.get('button[type="submit"]').click()
    })
)
Cypress.Commands.add('logout', () => {
    cy.get('#header').get('[aria-label="current-user"]').click();
    cy.get('li[data-id="logout"]').click();
})

Cypress.Commands.add('loginByGoogleApi', ({ email, password }) => {
    cy.get('input[type="email"]').focused().type(email)
})