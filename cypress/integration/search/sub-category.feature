Feature: Search Functionality : Sub Category

    Scenario Outline: Choose one sub-category

        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose '<sub-category>' sub category
        Then I see <quantity> products
        Then I see the sub category is '<sub-category>' in filter commands
        Examples:
            | sub-category | quantity |
            | Mac mini     | 1        |
            | MacBook Air  | 0        |