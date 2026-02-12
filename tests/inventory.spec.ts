import { test, expect } from '@playwright/test';

import { ROUTES } from '../shared/constants/routes.ts';
import { InventoryPage } from '../shared/pages/inventory.page.ts';
import { getRandomInt } from '../shared/utilities/utilities.ts';

test.describe('Inventory Functionality', () => {
  test.beforeEach('Test Preconditions', async ({ page }) => {
    await page.goto(ROUTES.inventory);
  });
  test('verify products exist on PLP', { tag: '@smoke' }, async ({ page }) => {
    await expect(page).toHaveURL(ROUTES.inventory);
    const inventory = new InventoryPage(page);
    const productCount = await inventory.getProductCount();
    expect(productCount).toBeGreaterThan(0);
  });
  test('verify user is able to add products to cart', { tag: '@smoke' }, async ({ page }) => {
    await expect(page).toHaveURL(ROUTES.inventory);
    const inventory = new InventoryPage(page);
    const productCount = await inventory.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    await inventory.addProductToCartByIndex(getRandomInt(0, productCount));
    const cartCount = await inventory.getCartCount();
    expect(cartCount).toBe('1');
  });
  test(
    'verify price of product is consistent on PLP and Cart',
    { tag: '@smoke' },
    async ({ page }) => {
      await expect(page).toHaveURL(ROUTES.inventory);
      const inventory = new InventoryPage(page);
      const productCount = await inventory.getProductCount();
      expect(productCount).toBeGreaterThan(0);
      const productIndex = getRandomInt(0, productCount);
      const productPriceOnPLP = await inventory.getProductPriceByIndex(productIndex);
      expect(productPriceOnPLP).toBeDefined();
      await inventory.addProductToCartByIndex(productIndex);
      const cartCount = await inventory.getCartCount();
      expect(cartCount).toBe('1');
      await inventory.openCart();
      await expect(page).toHaveURL(ROUTES.cart);
      const productPriceInCart = await inventory.getProductPriceByIndex(0);
      expect(productPriceInCart).toBeDefined();
      expect(productPriceInCart).toEqual(productPriceOnPLP);
    },
  );
});
