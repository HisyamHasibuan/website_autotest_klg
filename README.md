# website_autotest_klg

Web test automation using Playwright and TypeScript with Page Object Model (POM) for the [Katalon Demo CURA](https://katalon-demo-cura.herokuapp.com/) web app.

Author: **Hisyam Hasibuan**

---

## Test Scenarios
1. **TC_AUTH_01**: Verify successful login with valid credentials
2. **TC_AUTH_02**: Verify login fails with invalid username
3. **TC_AUTH_03**: Verify login fails with invalid password
4. **TC_AUTH_04**: Verify login fails with blank credentials
5. **TC_AUTH_05**: Verify user can log out successfully
6. **TC_APT_DT01**: Book appointment: Readmission=Yes, Program=Medicare, Date=Valid
7. **TC_APT_DT02**: Book appointment: Readmission=No, Program=Medicaid, Date=Valid
8. **TC_APT_DT03**: Book appointment fails: Blank Date (Mandatory)

---

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Run the tests:
   - Headless (no browser window):
     ```bash
     npm test
     ```
   - Headed (browser window open):
     ```bash
     npm run test:headed
     ```
   - UI Mode:
     ```bash
     npm run test:ui
     ```
   - View test report:
     ```bash
     npm run report
     ```
