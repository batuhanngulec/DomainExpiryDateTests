# Domain Expiry Date Check with Cypress

The selected code is a Cypress test script that checks the expiration dates of multiple domains. It uses the domains array from environment variables and iterates through each domain using forEach. For each domain, it visits the WHOIS page, targets the "Expires On" field, extracts the date, converts it to a Date object, and compares it with the current date and 10 days from now. If the domain is expiring within 10 days, it logs a message to the browser console and throws an error. Otherwise, it logs a safe message.

This script is designed to be run in a Cypress testing environment and requires the cypress package and the DOMAINS environment variable to be set up properly.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/batuhanngulec/DomainExpiryDateTests
    ```
2. Navigate to the project directory:
    ```bash
    cd DomainExpiryDateTests
    ```
3. Install the project dependencies:
    ```bash
    npm install
    ```

    If Cypress is not already listed in your `package.json`, add it by running:
    ```bash
    npm install cypress --save-dev
    ```

4. **Set up Environment Variables:**
    - `DOMAINS`: List of domains to check (e.g., `example.com, example.net`). Used by Cypress to test domain expiry dates.

## Running Tests
    To run the Cypress tests, use the following command:

    ```bash
    npx cypress open
    ```

## Notes

- **Date Format:** The code targets the "Expires On" field in WHOIS results. Ensure this field is correctly formatted.
- **Expiry Threshold:** The 10-day rule can be adjusted in the `tenDaysFromNow` variable.

