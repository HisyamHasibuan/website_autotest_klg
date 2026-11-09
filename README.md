# website_autotest_klg

Otomasi pengujian web menggunakan Playwright dan TypeScript dengan arsitektur Page Object Model (POM) untuk aplikasi web [Katalon Demo CURA](https://katalon-demo-cura.herokuapp.com/).

Author: **Hisyam Hasibuan**

---

## Struktur Folder
```
├── pages/
│   ├── LoginPage.ts         # Page Object Login & Auth
│   └── AppointmentPage.ts   # Page Object Appointment & Summary
├── tests/
│   └── cura.spec.ts         # Skenario pengujian (Auth & Decision Table)
├── playwright.config.ts     # Konfigurasi runner Playwright
├── package.json
├── tsconfig.json
└── README.md
```

---

## Daftar Skenario Uji (Test Scenarios)
1. **TC_AUTH_01**: Verify successful login with valid credentials
2. **TC_AUTH_02**: Verify login fails with invalid username
3. **TC_AUTH_03**: Verify login fails with invalid password
4. **TC_AUTH_04**: Verify login fails with blank credentials
5. **TC_AUTH_05**: Verify user can log out successfully
6. **TC_APT_DT01**: Book appointment: Readmission=Yes, Program=Medicare, Date=Valid
7. **TC_APT_DT02**: Book appointment: Readmission=No, Program=Medicaid, Date=Valid
8. **TC_APT_DT03**: Book appointment fails: Blank Date (Mandatory)

---

## Cara Menjalankan di Komputer Lokal

1. Install dependensi:
   ```bash
   npm install
   ```

2. Install browser Playwright:
   ```bash
   npx playwright install
   ```

3. Eksekusi pengujian:
   - Headless:
     ```bash
     npm test
     ```
   - Headed (Browser terbuka):
     ```bash
     npm run test:headed
     ```
   - UI Mode:
     ```bash
     npm run test:ui
     ```
   - Laporan pengujian:
     ```bash
     npm run report
     ```
