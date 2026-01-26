import { chromium, FullConfig, expect } from '@playwright/test';
import { LoginPage } from './shared/pages/login.page.ts';
import { ROUTES } from './shared/constants/routes.ts';
import { STRINGS } from './shared/constants/strings.ts';

export default async function globalSetup(config: FullConfig) {
  console.log('🔥 Running global setup');

  const { baseURL } = config.projects[0].use;

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const login = new LoginPage(page);

  await page.goto(`${baseURL}`);

  await login.login(process.env.APP_USER!, process.env.APP_PASS!);

  await expect(page).toHaveURL(`${baseURL}${ROUTES.inventory}`);
  await expect(page.getByText(STRINGS.loginErrorText)).toBeHidden();
  console.log('🔥🔥🔥 GLOBAL SETUP DEFINITELY RAN 🔥🔥🔥');

  // Save auth state
  await page.context().storageState({ path: 'auth.json' });

  await browser.close();
}
