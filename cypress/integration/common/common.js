import { Given, Then } from 'cypress-cucumber-preprocessor/steps';


Given('I am at the login page', () => {
    cy.visit(`${Cypress.config().baseUrl}/login`);
});

Given('I am at the search page with url /shop', () => {
    cy.visit(`${Cypress.config().baseUrl}/shop`);
});

Given('I clear all filter', () => {
    cy.get('[aria-label="filter-commands"]').get('#remove-filter').click();
})

Then(`I see {int} products`, (quantity) => {
    cy.get('[aria-label="filtered-products"]').children().should((prods)=>{
        // setTimeout(() => {
            console.log(">>>>>>", prods)
           expect(prods).to.have.length(quantity)
        // }, 5000);
    })    
})
