import type { Page } from '@playwright/test';

export class LoginPage {
  usernameInput;
  passwordInput;
  loginBtn;
  constructor(private readonly page: Page) {
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginBtn = this.page.locator('[data-test="login-button"]');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
