import { When, Then } from "cypress-cucumber-preprocessor/steps";

When(`I login with {string} and {string}`, (email, password) => {
    cy.loginWith({ email: email, password: password })
})
Then(`I should be on the {string} with url {string}`, (page, url) => {
    cy.url().should('eq', `${Cypress.config().baseUrl}${url}`, { timeout: 10000 })
})
Then(`My account's name {string} is showed on header navigation`, (account) => {
    cy.get('[aria-label="current-user"] span').should('have.text', account, { timeout: 10000 })
})
Then('I logout', () => {
    cy.logout()
})
Then(`I should be on the login page`, () => {
    cy.get('[aria-label="current-user"] span').should('not.exist')
})
// ************ TODO: ask
When('I click "Login with Google" button', () => {
    cy.get('[aria-label="google"]').click()
})
Then('I should be login', ()=>{
    cy.loginByGoogleApi({email:'message.django@gmail.com', password:'tx00112233'})
})
// ************