import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Define locator for cart item count
  cartItem = '[data-test="shopping-cart-link"]';

  async validateItemCount(count: string) {
    await expect(this.page.locator(this.cartItem)).toContainText(count);
  }
}
