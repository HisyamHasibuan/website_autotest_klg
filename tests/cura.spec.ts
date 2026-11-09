import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { AppointmentPage } from '../pages/AppointmentPage';

test.describe('Katalon Demo CURA - Test Automation Suite', () => {

  const VALID_USER = 'John Doe';
  const VALID_PASS = 'ThisIsNotAPassword';

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('TC_AUTH_01: Verify successful login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, VALID_PASS);

    await expect(page).toHaveURL(/.*#appointment/);
    await expect(appointmentPage.appointmentHeading).toBeVisible();
  });

  test('TC_AUTH_02: Verify login fails with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login('InvalidUser', VALID_PASS);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Login failed! Please ensure the username and password are valid.');
  });

  test('TC_AUTH_03: Verify login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, 'WrongPassword');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Login failed! Please ensure the username and password are valid.');
  });

  test('TC_AUTH_04: Verify login fails with blank credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login('', '');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('Login failed! Please ensure the username and password are valid.');
  });

  test('TC_AUTH_05: Verify user can log out successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, VALID_PASS);
    await loginPage.logout();

    await expect(loginPage.makeAppointmentButton).toBeVisible();
  });

  test('TC_APT_DT01: Book appointment - Readmission=Yes, Program=Medicare, Date=Valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, VALID_PASS);

    await appointmentPage.fillAppointment({
      facility: 'Seoul CURA Healthcare Center',
      applyReadmission: true,
      program: 'Medicare',
      visitDate: '12/12/2026',
      comment: 'Routine checkup',
    });
    await appointmentPage.submitAppointment();

    await expect(appointmentPage.confirmationHeading).toBeVisible();
    const summary = await appointmentPage.getSummaryData();
    expect(summary.facility).toBe('Seoul CURA Healthcare Center');
    expect(summary.readmission).toBe('Yes');
    expect(summary.program).toBe('Medicare');
    expect(summary.visitDate).toBe('12/12/2026');
    expect(summary.comment).toBe('Routine checkup');
  });

  test('TC_APT_DT02: Book appointment - Readmission=No, Program=Medicaid, Date=Valid', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, VALID_PASS);

    await appointmentPage.fillAppointment({
      facility: 'Tokyo CURA Healthcare Center',
      applyReadmission: false,
      program: 'Medicaid',
      visitDate: '15/12/2026',
      comment: '',
    });
    await appointmentPage.submitAppointment();

    await expect(appointmentPage.confirmationHeading).toBeVisible();
    const summary = await appointmentPage.getSummaryData();
    expect(summary.facility).toBe('Tokyo CURA Healthcare Center');
    expect(summary.readmission).toBe('No');
    expect(summary.program).toBe('Medicaid');
    expect(summary.visitDate).toBe('15/12/2026');
  });

  test('TC_APT_DT03: Book appointment fails - Blank Date (Mandatory)', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const appointmentPage = new AppointmentPage(page);

    await loginPage.clickMakeAppointment();
    await loginPage.login(VALID_USER, VALID_PASS);

    await appointmentPage.fillAppointment({
      facility: 'Hongkong CURA Healthcare Center',
      applyReadmission: false,
      program: 'None',
      visitDate: '',
    });
    await appointmentPage.submitAppointment();

    // Verifikasi validasi required field browser
    const message = await appointmentPage.getDateValidationMessage();
    expect(message).not.toBe('');
    await expect(appointmentPage.appointmentHeading).toBeVisible();
  });

});
