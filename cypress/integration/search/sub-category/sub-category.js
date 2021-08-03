import { Then, When } from "cypress-cucumber-preprocessor/steps";

When(`I choose {string} sub category`, (subCategory) => {
    cy.get(`ul>[data-id="sub-category-filter"] > div > div`).contains(subCategory).click();
})
Then(`I see the sub category is {string} in filter commands`, (subCategory) => {
    cy.get(`[aria-label="sub-category"] > span.text-info`).contains(subCategory)
})