import type { Page } from '@playwright/test';
import { ProductsComponent } from '../components/products.component.ts';
import { CartComponent } from '../components/cart.component.ts';

export class CartPage {
  products: ProductsComponent;
  cart: CartComponent;

  constructor(private readonly page: Page) {
    this.products = new ProductsComponent(this.page);
    this.cart = new CartComponent(this.page);
  }

  async getProductCount() {
    return await this.products.getProductCount();
  }

  async addProductToCartByIndex(index: number) {
    await this.products.addProductToCartByIndex(index);
  }

  async getCartCount() {
    return await this.cart.getCartCount();
  }

  async getProductPriceByIndex(index: number) {
    return await this.products.getProductPriceByIndex(index);
  }

  async openCart() {
    await this.cart.openCart();
  }
}
