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

  constructor(private readonly page: Page) {
    this.products = new ProductsComponent(this.page);
    this.cart = new CartComponent(this.page);
  }

  /**
   * Return number of products available (same helper as InventoryPage).
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
   */
  async getCartCount() {
    return await this.cart.getCartCount();
  }

  /**
   * Get product price by index.
   * @param index - zero-based product index
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
