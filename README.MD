# Domain Expiry Date Check with Cypress

This project contains a Cypress test scenario to check the expiry date of specified domains. If the expiry date of a domain is within 10 days, an error is thrown and logged to the console and test report.

## Installation

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   

2. **Install dependencies:**
    ```npm install

3. **Set up Environment Variables:**
    - `DOMAINS`: List of domains to check (e.g., `example.com, example.net`). Used by Cypress to test domain expiry dates.

## Running Tests
    To execute the tests, run the following command in your terminal:

## Notes

- **Date Format:** The code targets the "Expires On" field in WHOIS results. Ensure this field is correctly formatted.
- **Expiry Threshold:** The 10-day rule can be adjusted in the `tenDaysFromNow` variable.

