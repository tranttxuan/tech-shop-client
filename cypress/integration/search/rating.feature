Feature: Search Functionality : Rating

    Scenario Outline: Choose one rating

        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose <rating> filter
        Then I see <quantity> products
        Then I see the average rating is <rating> in filter commands
        Examples:
            | rating | quantity |
            | 5      | 1        |
            | 4      | 2        |
            | 3      | 1        |
            | 2      | 0        |
            | 1      | 0        |
