import type { Page } from '@playwright/test';
import { ProductsComponent } from '../components/products.component.ts';
import { CartComponent } from '../components/cart.component.ts';

/**
 * Page object for the cart page. Composes product and cart components
 * to expose common actions used in tests.
 */
export class CartPage {
  products: ProductsComponent;
  cart: CartComponent;

  /**
   *
   * @param page
   */
  constructor(private readonly page: Page) {
    this.products = new ProductsComponent(this.page);
    this.cart = new CartComponent(this.page);
  }

  /**
   * Count products in the listing.
   * @returns {Promise<number>} The number of products found in the listing.
   */
  async getProductCount() {
    return await this.products.getProductCount();
  }

  /**
   * Add a product to cart by index.
   * @param index - zero-based product index
   */
  async addProductToCartByIndex(index: number) {
    await this.products.addProductToCartByIndex(index);
  }

  /**
   * Read the cart badge count as shown in the header.
   * @returns {Promise<number>} The number shown in the cart badge, or 0 if no badge is visible.
   */
  async getCartCount() {
    return await this.cart.getCartCount();
  }

  /**
   * Get product price by index.
   * @param index - zero-based product index
   * @returns {Promise<string>} The price text of the specified product.
   */
  async getProductPriceByIndex(index: number) {
    return await this.products.getProductPriceByIndex(index);
  }

  /**
   * Open the cart view.
   */
  async openCart() {
    await this.cart.openCart();
  }
}
