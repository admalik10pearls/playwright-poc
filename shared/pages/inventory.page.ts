import type { Page } from '@playwright/test';
import { ProductsComponent } from '../components/products.component.ts';
import { CartComponent } from '../components/cart.component.ts';
/**
 * Page object representing the inventory/product list page.
 * Delegates product and cart interactions to reusable components.
 */
export class InventoryPage {
  products: ProductsComponent;
  cart: CartComponent;

  constructor(private readonly page: Page) {
    this.products = new ProductsComponent(this.page);
    this.cart = new CartComponent(this.page);
  }

  /**
   * Get number of products displayed on the listing page.
   */
  async getProductCount() {
    return await this.products.getProductCount();
  }

  /**
   * Add a product to cart by its index on the listing.
   * @param index - zero-based product index
   */
  async addProductToCartByIndex(index: number) {
    await this.products.addProductToCartByIndex(index);
  }

  /**
   * Retrieve the current cart badge count.
   */
  async getCartCount() {
    return await this.cart.getCartCount();
  }

  /**
   * Get the product price for a product by index.
   * @param index - zero-based product index
   */
  async getProductPriceByIndex(index: number) {
    return await this.products.getProductPriceByIndex(index);
  }

  /**
   * Open the cart page via header/cart link.
   */
  async openCart() {
    await this.cart.openCart();
  }
}
