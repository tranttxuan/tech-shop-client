import { Then, When } from "cypress-cucumber-preprocessor/steps";

When('I choose {string} brand', (brand) => {
    cy.get(`[aria-label='sidebar-brand']`).click();
    cy.get(`ul>[data-id="brand-filter"] > div > div > label > span:last-child`).contains(brand).click();
});

Then(`I see the {string} in filter commands`, (brand) => {
    cy.get(`[aria-label="brand"] > span.text-info`).contains(brand)
})