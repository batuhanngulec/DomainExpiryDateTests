/// <reference types="cypress" />
const domainsString = Cypress.env('DOMAINS'); // Get the domains string from environment variables
const domains = JSON.parse(domainsString); // Parse the string into an array

describe('Domain Expiry Date Check', () => {
  domains.forEach((domain) => {
    it(`${domain} Domain Expiry Date Check`, () => {
      cy.visit(`https://who.is/whois/${domain}`);

      // Target the "Expires On" field
      cy.get('.queryResponseBodyRow').contains('Expires On').parent().find('.queryResponseBodyValue')
        .invoke('text')
        .then((expiryDateText) => {
          const expiryDate = new Date(expiryDateText.trim());
          const currentDate = new Date();
          const fifteenDaysFromNow = new Date();
          fifteenDaysFromNow.setDate(currentDate.getDate() + 15); // 15 days from now

          if (expiryDate < fifteenDaysFromNow) {
            cy.log(`${domain} expires within 15 days!`); // Log to Cypress
            assert.fail(`${domain} expires within 15 days!`); // Fail the test
          } else {
            cy.log(`${domain} is safe, expiry date is more than 15 days away.`); // Log to Cypress
          }
        })
        .catch((error) => {
          cy.log(`Error processing ${domain}: ${error.message}`); // Log error if any
          assert.fail(`Failed to check expiry date for ${domain}`); // Fail the test if there's an error
        });
    });
  });
});