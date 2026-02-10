import type { Page } from '@playwright/test';

/**
 * Component encapsulating product-list interactions (locators & actions).
 */
export class ProductsComponent {
  products;
  addToCartButtons;
  productPrice;

  /**
   *
   * @param page
   */
  constructor(private readonly page: Page) {
    this.products = this.page.locator('[data-test="inventory-item"]');
    this.addToCartButtons = this.page.locator(
      '[data-test="inventory-item"] button:has-text("Add to cart")',
    );
    this.productPrice = this.page.locator('[data-test="inventory-item-price"]');
  }

  /**
   * Count products in the listing.
   * @returns {Promise<number>} The number of products found in the listing.
   */
  async getProductCount() {
    return await this.products.count();
  }

  /**
   * Click the 'Add to cart' button for a product by index.
   * @param index - zero-based index of the product
   */
  async addProductToCartByIndex(index: number) {
    await this.addToCartButtons.nth(index).click();
  }

  /**
   * Get the product price text for a given product index.
   * @param index - zero-based index of the product
   * @returns {Promise<string>} The price text of the specified product.
   */
  async getProductPriceByIndex(index: number) {
    return await this.productPrice.nth(index).innerText();
  }
}
