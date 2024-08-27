/// <reference types="cypress" />
const domainsString = Cypress.env('DOMAINS'); // Get the domains string from environment variables
const domains = JSON.parse(domainsString); // Parse the string into an array

describe('Domain Expiry Date Check', () => {
  domains.forEach((domain) => {
    it(`${domain} Domain Expiry Date Check`, () => {
      cy.visit(`https://who.is/whois/${domain}`);

      // Target the "Expires On" field
      cy.get('.queryResponseBodyRow').contains('Expires On').parent().find('.queryResponseBodyValue').then(($expiryDateElement) => {
        const expiryDateText = $expiryDateElement.text().trim();
        const expiryDate = new Date(expiryDateText);

        const currentDate = new Date();
        const sixtyDaysFromNow = new Date();
        sixtyDaysFromNow.setDate(currentDate.getDate() + 15); // 15 days from now

        if (expiryDate < sixtyDaysFromNow) {
          console.log(`${domain} expires within 15 days!`); // Log to the browser console
          throw new Error(`${domain} expires within 15 days!`);
        } else {
          console.log(`${domain} is safe, expiry date is more than 15 days away.`); // Log to the browser console
        }
      });
    });
  });
});