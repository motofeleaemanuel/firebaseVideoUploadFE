/* eslint-disable no-undef */

describe('Tesintg login functionalities', function() {
  it('authentification page can be opened', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Login')
  })
  it('should log in successfully with valid credentials', () => {
    cy.visit('http://localhost:3000')
    // Assuming your login form has input fields with ids: 'username' and 'password'
    cy.get('#email').type('renatopomparau21@gmail.com');
    cy.get('#password').type('password'); 
    cy.get('#form').click(); // Submit the login form


    cy.contains('Upload file');
    cy.url().should('include', '/main'); 
  })
  
  it('displays error message for unauthorized login', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401 }).as('loginRequest');

    // Perform actions that trigger the login request
    cy.visit('http://localhost:3000'); // Replace with your application's URL
    cy.get('#email').type('renatopomparau21@gmail.com');
    cy.get('#password').type('invalidpassword');
    cy.get('#form').click(); // Click the submit button

    // Wait for the intercepted request and check for the unauthorized error message
    cy.wait('@loginRequest').then((interception) => {
      expect(interception.response.statusCode).to.eq(401); // Ensure the response status is 401
      cy.contains('Unauthorized access'); // Example assertion for displaying an "Unauthorized" message
      // Add other assertions based on your application's behavior for unauthorized login
    });
  });
  it('displays error message for wrong format for email', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401 }).as('loginRequest');

    // Perform actions that trigger the login request
    cy.visit('http://localhost:3000'); // Replace with your application's URL
    cy.get('#email').type('renatopomparau21');
    cy.get('#password').type('invalidpassword');
    cy.get('#form').click(); // Click the submit button

    // Wait for the intercepted request and check for the unauthorized error message
    
    cy.contains('Invalid email address'); // Example assertion for displaying an "Unauthorized" message

  });
  it('displays error message for wrong format for email', () => {
    cy.intercept('POST', '/api/auth/login', { statusCode: 401 }).as('loginRequest');

    // Perform actions that trigger the login request
    cy.visit('http://localhost:3000'); // Replace with your application's URL
    cy.get('#email').type('renatopomparau21@gmail.com');
    cy.get('#form').click(); // Click the submit button

    // Wait for the intercepted request and check for the unauthorized error message
    
    cy.contains('Password is required'); // Example assertion for displaying an "Unauthorized" message

  });
  });

describe('Testining functionalities once connected', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
    cy.get('#email').type('renatopomparau21@gmail.com');
    cy.get('#password').type('password'); 
    cy.get('#form').click(); // Submit the login form
  });
  it('uploads a file successfully', () => {

    cy.fixture('recording.mp4').then((fileContent) => {
      cy.get('#fileInput').attachFile({
        fileContent,
        fileName: 'recording.mp4',
        mimeType: 'video/mp4',
      });
    });

    cy.get('form').submit();

    // Wait for any UI changes or feedback after the upload (if any)
    cy.contains('File uploaded successfully');
    cy.get('#viewAllButton').click(); // Submit the login form
    cy.contains('recording.mp4').should('be.visible');

    cy.get('#deleteButton').click();

    cy.contains('recording.mp4').should('not.exist');
  });
})
describe('sign out of the application', function() {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
    cy.get('#email').type('renatopomparau21@gmail.com');
    cy.get('#password').type('password'); 
    cy.get('#form').click(); // Submit the login form
  });
  it('logout', () => {
    cy.get('#signoutButton').click();

    cy.contains('Login')
  });
})