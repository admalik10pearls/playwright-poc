import type { Page } from '@playwright/test';

export class CartComponent {
  cartBadge;
  cartLink;

  constructor(private readonly page: Page) {
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  async getCartCount() {
    return await this.cartBadge.innerText();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
