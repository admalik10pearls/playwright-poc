import { test, expect } from '@playwright/test';
import { ROUTES } from '../shared/constants/routes.ts';
import { InventoryPage } from '../shared/pages/inventory.page.ts';

test.describe('Inventory Functionality', () => {
  test.beforeEach('Test Preconditions', async ({ page }) => {
    await page.goto(ROUTES.inventory);
  });
  test('verify products exist on PLP', async ({ page }) => {
    await expect(page).toHaveURL(ROUTES.inventory);
    const inventory = new InventoryPage(page);
    const productCount = await inventory.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
});
