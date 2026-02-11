import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
const uiBaseURL = 'https://www.saucedemo.com';

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html'], ['allure-playwright', { resultsDir: 'allure-results' }]],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // ---------- UI PROJECTS ----------
    {
      name: 'ui-chromium',
      testIgnore: ['**/api/**'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: uiBaseURL,
        storageState: 'auth.json',
      },
    },
    {
      name: 'ui-firefox',
      testIgnore: ['**/api/**'],
      use: {
        ...devices['Desktop Firefox'],
        baseURL: uiBaseURL,
        storageState: 'auth.json',
      },
    },
    {
      name: 'ui-webkit',
      testIgnore: ['**/api/**'],
      use: {
        ...devices['Desktop Safari'],
        baseURL: uiBaseURL,
        storageState: 'auth.json',
      },
    },

    // ---------- API PROJECT ----------
    {
      name: 'api',
      testMatch: ['tests/api/*.spec.ts'],
    },
  ],
});
