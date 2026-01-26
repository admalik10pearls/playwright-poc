import type { Page } from '@playwright/test';

export class InventoryPage {
  products;
  constructor(private page: Page) {
    this.products = this.page.locator('[data-test="inventory-item"]');
  }

  async getProductCount() {
    return await this.products.count();
  }
}
