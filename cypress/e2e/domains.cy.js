/// <reference types="cypress" />
const domains = Cypress.env('DOMAINS'); // Get the domains array from environment variables

describe('Domain Expiry Date Check', () => {
  domains.forEach((domain) => {
    it(`${domain} Domain Expiry Date Check`, () => {
      cy.visit(`https://who.is/whois/${domain}`);

      // Target the "Expires On" field
      cy.get('.queryResponseBodyRow').contains('Expires On').parent().find('.queryResponseBodyValue').then(($expiryDateElement) => {
        const expiryDateText = $expiryDateElement.text().trim();
        
        // Convert the date to a Date object since it's in "YYYY-MM-DD" format
        const expiryDate = new Date(expiryDateText);

        const currentDate = new Date();
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(currentDate.getDate() + 10); // 10 days from now

        // Yıl, ay ve gün karşılaştırması yapıyoruz
        if (expiryDate.getTime() < tenDaysFromNow.getTime()) {
          console.log(`${domain} is expiring in 10 days!`); // Log to browser console
          throw new Error(`${domain} is expiring in 10 days!`);
        } else {
          console.log(`${domain} is safe, expiration date is more than 10 days away.`); // Log to browser console
        }
      });
    });
  });
});