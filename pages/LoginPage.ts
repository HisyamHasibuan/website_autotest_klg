import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly makeAppointmentButton: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly menuToggle: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.makeAppointmentButton = page.locator('#btn-make-appointment');
    this.usernameInput = page.locator('#txt-username');
    this.passwordInput = page.locator('#txt-password');
    this.loginButton = page.locator('#btn-login');
    this.errorMessage = page.locator('.text-danger');
    this.menuToggle = page.locator('#menu-toggle');
    this.logoutLink = page.locator('a[href*="logout"]');
  }

  async navigate() {
    await this.page.goto('https://katalon-demo-cura.herokuapp.com/');
  }

  async clickMakeAppointment() {
    await this.makeAppointmentButton.click();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async logout() {
    await this.menuToggle.click();
    await this.logoutLink.click();
  }

  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.innerText();
  }
}
