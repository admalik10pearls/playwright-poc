/* eslint-disable sonarjs/cognitive-complexity */
import { chromium, firefox, webkit, FullConfig, expect } from '@playwright/test';

import { ROUTES } from './shared/constants/routes.ts';
import { STRINGS } from './shared/constants/strings.ts';
import { LoginPage } from './shared/pages/login.page.ts';

/**
 * Global setup for Playwright runs. When UI projects are included in the run
 * this function performs an authenticated login and writes `auth.json`.
 *
 * Behavior:
 * - If CLI `--project` flags are provided, those project names are considered.
 * - If only the `api` project is being run, the setup is skipped.
 * - If any `ui-*` project is being run, the setup runs once for the first UI project found.
 *
 * @param config - Playwright full configuration object provided by Playwright
 */
export default async function globalSetup(config: FullConfig) {
  type ExtendedProject = FullConfig['projects'][number] & { _selected?: boolean };

  const allProjects = config.projects as ExtendedProject[];

  console.log('Available projects:', allProjects.map((p) => p.name).join(', '));

  /* Determine which projects are being run
   Priority order:
   1) If CLI --project flag(s) provided, use those names
   2) Otherwise, if Playwright marked projects as selected via internal field, use those
   3) Fallback to all projects */

  // Parse CLI args for --project or -p flags (supports --project=foo, --project foo)
  const argv = process.argv.slice(2).join(' ');
  const cliProjectMatches: string[] = [];
  // --project=name or --project name
  const reEq = /--project=([^\s]+)/g;
  let m: RegExpExecArray | null;
  while ((m = reEq.exec(argv))) {
    cliProjectMatches.push(...m[1].split(','));
  }
  // --project name (separate arg)
  const reSeparate = /--project\s+([^\s]+)/g;
  while ((m = reSeparate.exec(argv))) {
    cliProjectMatches.push(...m[1].split(','));
  }

  // Short flag -p
  const reShort = /-p=([^\s]+)|-p\s+([^\s]+)/g;
  while ((m = reShort.exec(argv))) {
    const val = m[1] || m[2];
    if (val) cliProjectMatches.push(...val.split(','));
  }

  const cliProjectNames = Array.from(
    new Set(cliProjectMatches.map((s) => s.trim()).filter(Boolean)),
  );

  const selectedProjects = allProjects.filter((p) => p._selected);

  let projectsToCheck: ExtendedProject[] = allProjects;
  if (cliProjectNames.length) {
    // Map CLI names to project definitions (if they exist)
    const matched = allProjects.filter((p) => cliProjectNames.includes(p.name));
    if (matched.length) projectsToCheck = matched;
    else projectsToCheck = allProjects; // fallback if names don't match
  } else if (selectedProjects.length > 0) {
    projectsToCheck = selectedProjects;
  }

  console.log('Projects to check:', projectsToCheck.map((p) => p.name).join(', '));

  // Check if any project being run is API
  const hasAPIProject = projectsToCheck.some((p) => p.name === 'api');
  const hasUIProject = projectsToCheck.some((p) => p.name.startsWith('ui-'));

  // Skip global setup if only API projects are being run
  if (hasAPIProject && !hasUIProject) {
    console.log('Skipping global setup: API project selected, authentication not needed.');
    return;
  }

  // Skip if no UI projects are being run
  if (!hasUIProject) {
    console.log('Skipping global setup: no UI projects selected for this run.');
    return;
  }

  // Only run for the first UI project to avoid duplicate auth
  const uiProject = projectsToCheck.find((p) => p.name.startsWith('ui-')) as
    | ExtendedProject
    | undefined;

  if (!uiProject) return;

  const { baseURL, storageState, browserName } = uiProject.use as {
    baseURL?: string;
    storageState?: string;
    browserName?: string;
  };

  if (!baseURL || !storageState) return;

  console.log(`Running global setup for project: ${uiProject.name}`);

  const browserType =
    browserName === 'firefox' ? firefox : browserName === 'webkit' ? webkit : chromium;

  const browser = await browserType.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const login = new LoginPage(page);

  await page.goto(baseURL);
  await login.login(process.env.APP_USER!, process.env.APP_PASS!);

  await expect(page).toHaveURL(`${baseURL}${ROUTES.inventory}`);
  await expect(page.getByText(STRINGS.loginErrorText)).toBeHidden();

  await context.storageState({ path: storageState as string });
  await browser.close();

  console.log('Global setup completed successfully.');
}
