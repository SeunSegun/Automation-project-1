beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
it('Username cannot be empty string', () => {
    // get username input field
    cy.get('#username').type(' ')

    // in order to activate submit button, user has to click somewhere outside the input field
    cy.get('h2').contains('Password').click()

    //error message should be visible
    cy.get('#input_error_message').should('be.visible')
    //successfull message should not be visile
    cy.get('#success_message').should('not.be.visible')
})

it('Username tooltip is visible', () => {
    // get username input field
    cy.get('#username').type('{enter}')

    // in order to activate submit button, user has to click somewhere outside the input field
    cy.get('h2').contains('Password').click()

    // empty field should show tooltip - Please add username
    cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')

    //if not entered, username field has red outline
    cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        // check that username HTML has min attribute value equalt to 1
        cy.get('#username').should('have.attr', 'min', '1')

        // check that username HTML has max attribute value equal to 50
        cy.get('#username').should('have.attr', 'max', '50')
    })

 it('Username should support only lower letters and numbers', () => {
        // check with regex supporter format
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })

 it('Email input should support correct pattern', () => {
        // Check regex
        // input invalid email
        // check that tooltip is same as expected
        // submit button should not be active
        cy.get('#email').should('have.attr', 'pattern').should('contain', 'a-z0-9')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
    })

 it('Email input should support correct pattern', () => {
        // Check regex
        // input invalid email
        // check that tooltip is same as expected
        // submit button should not be active
        cy.get('#email').should('have.attr', 'pattern').should('contain', 'a-z0-9')
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
        cy.get('.submit_button').should('not.be.enabled');
    })

 it('BMW should not be listed in cars list', () => {
        
        // Check list size is 4
        cy.get('#cars').children().should('have.length', 4)

        // Check list does not contain BMW
        cy.get('#cars option').first().should('have.text', 'Volvo')
        cy.get('#cars option').eq(1).should('have.text', 'Saab')
        cy.get('#cars option').eq(2).should('have.text', 'Opel')
        cy.get('#cars option').last().should('text', 'Audi')
    })