import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // Define locators
  USERNAME_INPUT = '[data-test="username"]';
  PASSWORD_INPUT = '[data-test="password"]';
  LOGIN_BUTTON = '[data-test="login-button"]';

  async login(username: string, password: string) {
    await this.page.locator(this.USERNAME_INPUT).fill(username);
    await this.page.locator(this.PASSWORD_INPUT).fill(password);
    await this.page.locator(this.LOGIN_BUTTON).click();
  }
}