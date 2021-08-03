Feature: Search Functionality : Category

    Scenario Outline: Choose one category

        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose '<cat>' Category
        Then I see <quantity> products
        Then I see the category is '<cat>' in filter commands
        Examples:
            | cat     | quantity |
            | HP      | 3        |
            | Lenovo  | 1        |
            | MacBook | 2        |

    Scenario Outline: Choose Two category

        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose '<cat1>' and '<cat2>' categories
        Then I see <quantity> products
        Then I see the category is '<cat1>' and '<cat2>' in filter commands
        Examples:
            | cat1    | cat2    | quantity |
            | HP      | Lenovo  | 4        |
            | HP      | MacBook | 5        |
            | MacBook | Lenovo  | 3        |

    Scenario Outline: Choose Three category

        Given I am at the search page with url /shop
        Given I clear all filter
        When I choose '<cat1>' and '<cat2>' and '<cat3>' categories
        Then I see <quantity> products
        Then I see the category is '<cat1>' and '<cat2>' and '<cat3>' in filter commands
        Examples:
            | cat1 | cat2   | cat3    | quantity |
            | HP   | Lenovo | MacBook | 6        |