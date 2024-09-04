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
        const fifteenDaysFromNow = new Date();
        fifteenDaysFromNow.setDate(currentDate.getDate() + 15); // 15 gün sonrası

        // Yıl, ay ve gün karşılaştırması yapıyoruz
        if (expiryDate.getTime() < fifteenDaysFromNow.getTime()) {
          console.log(`${domain} 15 gün içinde sona eriyor!`); // Tarayıcı konsoluna log yazdır
          throw new Error(`${domain} 15 gün içinde sona eriyor!`);
        } else {
          console.log(`${domain} güvenli, son kullanma tarihi 15 günden fazla bir süre uzakta.`); // Tarayıcı konsoluna log yazdır
        }
      });
    });
  });
});