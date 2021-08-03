import { When } from "cypress-cucumber-preprocessor/steps";

When(`I choose {string} Category`, (cat) => {
    cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat).click();
})

Then(`I see the category is {string} in filter commands`, (category) => {
    cy.get(`[aria-label="category"] > span.text-info`).contains(category)
})

When(`I choose {string} and {string} categories`, (cat1, cat2) => {
        cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat1).click();
        cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat2).click();
})
Then(`I see the category is {string} and {string} in filter commands`, (category1, category2 ) => {
    cy.get(`[aria-label="category"] > span.text-info`).contains(category1)
    cy.get(`[aria-label="category"] > span.text-info`).contains(category2)
})

When(`I choose {string} and {string} and {string} categories`, (cat1, cat2, cat3) => {
    cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat1).click();
    cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat2).click();
    cy.get(`ul>[data-id="category-filter"] > div > div > label > span:last-child`).contains(cat3).click();
})

Then(`I see the category is {string} and {string} and {string} in filter commands`, (category1, category2, category3 ) => {
    cy.get(`[aria-label="category"] > span.text-info`).contains(category1)
    cy.get(`[aria-label="category"] > span.text-info`).contains(category2)
    cy.get(`[aria-label="category"] > span.text-info`).contains(category3)
})