import type { Page } from '@playwright/test';

/**
 * Component handling cart-specific UI interactions (badge and navigation).
 */
export class CartComponent {
  cartBadge;
  cartLink;

  /**
   *
   * @param page
   */
  constructor(private readonly page: Page) {
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = this.page.locator('[data-test="shopping-cart-link"]');
  }

  /**
   * Read the cart badge text (number of items).
   * @returns the text content of the cart badge, which indicates the number of items in the cart.
   */
  async getCartCount() {
    return await this.cartBadge.innerText();
  }

  /**
   * Click the shopping cart link to open the cart view.
   */
  async openCart() {
    await this.cartLink.click();
  }
}
