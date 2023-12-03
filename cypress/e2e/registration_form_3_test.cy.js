beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_3.html')
})

/*
BONUS TASK: add visual tests for registration form 3
Task list:
* Test suite for visual tests for registration form 3 is already created
* Create tests to verify visual parts of the page:
    * radio buttons and its content
    * dropdown and dependencies between 2 dropdowns
    * checkboxes, their content and links
    * email format
 */
describe('Visual Tests for Registration Form 3', () => {
    it('Cuntry dropdown is correct', () => {
        // Check that the dropdown has four options
        cy.get('#country').children('option').should('have.length', 4)
        cy.get('#country').find('option').should('have.length', 4)
        cy.get('#country').select(2).screenshot('Country drop-down')
        cy.screenshot('Full page screenshot')
        //Check  that second element in the dropdown has text Spain
        cy.get('#country').find('option').eq(1).should('have.text', 'Spain')
    })
    it('City selection is correct', () => {
     // Select country
     cy.get('#country').select('Estonia')
     // Check that the dropdown has three options   
     cy.get('#city').children('option').should('have.length', 4)
     cy.get('#city').find('option').should('have.length', 4)
     cy.get('#city').select(3).screenshot('City drop-down')
     cy.screenshot('Full page screenshot')
    })
    it('Set the value of the date input', () => {
    const dateToSet = '2000-09-09'
      cy.get('input[type="date"]').eq(0).clear().type(dateToSet)
      cy.get('input[type="date"]').should('have.value', dateToSet)
      cy.get('input[type="date"][name="birthday"]').type(dateToSet)
      cy.screenshot('Full page screenshot')
    })
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[name="freq"]').next().eq(0).should('have.text','Daily')
        cy.get('input[name="freq"]').next().eq(1).should('have.text','Weekly')
        cy.get('input[name="freq"]').next().eq(2).should('have.text','Monthly')
        cy.get('input[name="freq"]').next().eq(3).should('have.text','Never')
        //Verify default state of radio buttons
        cy.get('input[name="freq"]').eq(0).should('not.be.checked')
        cy.get('input[name="freq"]').eq(1).should('not.be.checked')
        cy.get('input[name="freq"]').eq(2).should('not.be.checked')
        cy.get('input[name="freq"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from other radio button
        cy.get('input[name="freq"]').eq(0).check().should('be.checked')
        cy.get('input[name="freq"]').eq(1).check().should('be.checked')
        cy.get('input[name="freq"]').eq(0).should('not.be.checked')
    })
    it('Check that checkbox content and links are working ', () => {
       // Privacy policy checkbox
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').should('be.checked')
        cy.screenshot('after_checkbox_checked')
       // Cookie policy link can be open 
       // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
       cy.get('a').should('be.visible').should('have.text', 'Accept our cookie policy').click()
       // Check that currently opened URL is correct
       cy.url().should('contain', '/cookiePolicy.html')
       // Go back to previous page
       cy.go('back')
    })
    it('Check that user can use only valid email format', () => {
      // Enter an invalid email address
      cy.get('input[name="email"]').type('OSStest')
      // check that an error message is displayed for invalid email format
      cy.get('span:contains("Invalid email address.")').should('be.visible')
      // Clear the email field
      cy.get('input[name="email"]').clear()
      // Enter a valid email address
      cy.get('input[name="email"]').type('OSS@test.com')
      // Check that the error message span is not visible for valid email format
      cy.get('span:contains("Invalid email address.")').should('not.be.visible')
     })
})


/*
BONUS TASK: add functional tests for registration form 3
Task list:
* Create second test suite for functional tests
* Create tests to verify logic of the page:
    * all fields are filled in + validation
    * only mandatory fields are filled in + validations
    * mandatory fields are absent + validations (try using function)
    * If city is already chosen and country is updated, then city choice should be removed
    * add file (google yourself for solution)
 */
describe('Registration Form 3 - Functional Tests', () => {
 it('User can submit when all fields are filled', ()=>{
    cy.get('#name').type('Seun Segun')
    cy.get('input[name="email"]').type('OOS@test.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('string:Tartu')
    cy.get('input[type="date"]').first().type('2000-09-09')
    cy.get('input[name="freq"][value="Monthly"]').check()
    cy.get('input[type="date"][name="birthday"]').type('2000-09-09')
    cy.get('input[type="checkbox"][required][ng-model="checkbox"]').check()
    cy.get('input[type="checkbox"][required]').check() 
    // Assert that error message is not visible and submit button is enabled
    cy.get('.error-message').should('not.exist')
    cy.get('input[type="submit"][ng-disabled="myForm.$invalid"]').should('be.enabled')
 })
  it('User can submit form with valid data and only mandatory fields added', ()=>{
    cy.get('#name').type('Seun Segun')
    cy.get('input[name="email"]').type('OOS@test.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('string:Tartu')
    cy.get('input[type="checkbox"][required][ng-model="checkbox"]').check()
    // Assert that error message is not visible and submit button is enabled
    cy.get('.error-message').should('not.exist')
    cy.get('input[type="submit"][ng-disabled="myForm.$invalid"]').should('be.enabled')
  })
 it('User cannot submit form without mandatory fields added', ()=>{
    cy.get('#country').select('Estonia')
    cy.get('#city').select('string:Tartu')
    cy.get('input[type="date"]').first().type('2000-09-09')
    cy.get('input[name="freq"][value="Monthly"]').check()
    cy.get('input[type="date"][name="birthday"]').type('2000-09-09')
  // Assert that submit button is disabled
    cy.get('.error-message').should('not.exist')
    cy.get('input[type="submit"][ng-disabled="myForm.$invalid"]').should('not.be.enabled')
  }) 
 it('City choice should be removed when country is updated ', ()=>{
    cy.get('#name').type('Seun Segun')
    cy.get('input[name="email"]').type('OOS@test.com')
    cy.get('#country').select('Estonia')
    cy.get('#city').select('string:Tartu')
    cy.get('input[type="date"]').first().type('2000-09-09')
    cy.get('input[name="freq"][value="Monthly"]').check()
    cy.get('input[type="date"][name="birthday"]').type('2000-09-09')
    cy.get('input[type="checkbox"][required][ng-model="checkbox"]').check()
    cy.get('input[type="checkbox"][required]').check() 
    // Change the coutry and city choice should be removed
    cy.get('#country').select('Austria')
    cy.get('#city').eq(0)
  }) 
  it(' User can add files ', ()=>{
    cy.get('input[type=file]').selectFile('cypress/fixtures/cerebrum_hub_logo.png')
  }) 
})