Feature: Login
    Scenario Outline: Login with different username
        Given I am at the login page
        When I login with '<username>' and '<password>'
        Then I should be on the '<page>' with url '<url>'
        And My account's name '<account>' is showed on header navigation
        Then I logout
        Examples:
            | username                | password   | page      | url              | account       |
            | tran.ttxuan91@gmail.com | tx00112233 | dashboard | /admin/dashboard | tran.ttxuan91 |
            | vothimytin.89@gmail.com | tx00112233 | history   | /user/history    | vothimytin.89 |

    Scenario Outline: Login with wrong username or password
        Given I am at the login page
        When I login with '<username>' and '<password>'
        Then I should be on the login page
        Examples:
            | username                | password   |
            | tran.ttxuan91           | tx00112233 |
            | tran.ttxuan91@gmail.com | tx123456   |

# ************ TODO: ask ????
    # Scenario: Login with Google login 
    #       Given I am at the login page
    #       When I click "Login with Google" button
    #       Then I should be login