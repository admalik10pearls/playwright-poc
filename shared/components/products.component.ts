import type { Page } from '@playwright/test';

export class ProductsComponent {
  products;
  addToCartButtons;
  productPrice;

  constructor(private page: Page) {
    this.products = this.page.locator('[data-test="inventory-item"]');
    this.addToCartButtons = this.page.locator(
      '[data-test="inventory-item"] button:has-text("Add to cart")',
    );
    this.productPrice = this.page.locator('[data-test="inventory-item-price"]');
  }

  async getProductCount() {
    return await this.products.count();
  }

  async addProductToCartByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  async getProductPriceByIndex(index: number) {
    return await this.productPrice.nth(index).innerText();
  }
}
