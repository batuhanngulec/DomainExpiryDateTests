/// <reference types="cypress" />
const domains = Cypress.env('DOMAINS'); // Get the domains array from environment variables

describe('Domain Expiry Date Check', () => {
  domains.forEach((domain) => {
    it(`${domain} Domain Expiry Date Check`, () => {
      cy.visit(`https://who.is/whois/${domain}`);

      // Target the "Expires On" field
      cy.get('.queryResponseBodyRow').contains('Expires On').parent().find('.queryResponseBodyValue').then(($expiryDateElement) => {
        const expiryDateText = $expiryDateElement.text().trim();
        
        // Tarihi "YYYY-MM-DD" formatında olduğu için doğrudan Date nesnesine dönüştürüyoruz
        const expiryDate = new Date(expiryDateText);

        const currentDate = new Date();
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(currentDate.getDate() + 10); // 10 gün sonrası

        // Yıl, ay ve gün karşılaştırması yapıyoruz
        if (expiryDate.getTime() < tenDaysFromNow.getTime()) {
          console.log(`${domain} 10 gün içinde sona eriyor!`); // Tarayıcı konsoluna log yazdır
          throw new Error(`${domain} 10 gün içinde sona eriyor!`);
        } else {
          console.log(`${domain} güvenli, son kullanma tarihi 10 günden fazla bir süre uzakta.`); // Tarayıcı konsoluna log yazdır
        }
      });
    });
  });
});