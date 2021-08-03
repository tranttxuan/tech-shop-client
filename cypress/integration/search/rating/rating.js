import { Then } from "cypress-cucumber-preprocessor/steps"

When(`I choose {int} filter`, (rating) => {
    const positionOfRatingStars = 5 - rating + 1
    cy.get(`ul>[data-id="rating-filter"] > div:nth-child(${positionOfRatingStars}) > div.star-ratings > div`)
        .should('have.length', rating)
        .parent()
        .click()
})
Then(`I see the average rating is {int} in filter commands`, (average) => {
    cy.get(`[aria-label="rating"] > span.text-info`).contains(average)
})