Feature: Search Functionality: Brand

    Scenario Outline: Choose one brand
        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose '<brand>' brand
        Then I see <quantity> products
        Then I see the '<brand>' in filter commands
        Examples:
            | brand     | quantity |
            | Apple     | 4        |
            | Samsung   | 1        |
            | Microsoft | 0        |
