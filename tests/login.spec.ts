import { test, expect } from '@playwright/test';
import { ROUTES } from '../shared/constants/routes.ts';
import { LoginPage } from '../shared/pages/login.page.ts';
import { STRINGS } from '../shared/constants/strings.ts';

test.describe('Login Functionality', () => {
  const user = process.env.APP_USER!;
  const pass = process.env.APP_PASS!;
  test.beforeEach('Test Preconditions', async ({ page }) => {
    await page.goto('/');
  });
  test('user is able to login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(user, pass);
    await expect(page).toHaveURL(ROUTES.inventory);
  });
  test('user is unable to login with invalid password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(user, 'wrongPassword');
    await expect(page.getByText(STRINGS.loginErrorText)).toBeVisible();
    await expect(page).not.toHaveURL(ROUTES.inventory);
  });
  test('user is unable to login with invalid username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.login('invalidUser', pass);
    await expect(page.getByText(STRINGS.loginErrorText)).toBeVisible();
    await expect(page).not.toHaveURL(ROUTES.inventory);
  });
});
