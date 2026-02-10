import type { Page } from '@playwright/test';

/**
 * Page object for the login page.
 * Encapsulates login form locators and the login action.
 */
export class LoginPage {
  usernameInput;
  passwordInput;
  loginBtn;
  /**
   *
   * @param page
   */
  constructor(private readonly page: Page) {
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-button"]');
  }

  /**
   * Perform a login using provided credentials.
   * @param username - login username
   * @param password - login password
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
