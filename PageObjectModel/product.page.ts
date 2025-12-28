import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) {}

  productItem = '[data-test="inventory-list"]';
  addToCartBtn = [
                '[data-test="add-to-cart-sauce-labs-backpack"]', 
                '[data-test="add-to-cart-sauce-labs-bike-light"]', 
                '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
                '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
                '[data-test="add-to-cart-sauce-labs-onesie"]',
                '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'
                ];
  removeBtn = [
                '[data-test="remove-sauce-labs-backpack"]',
                '[data-test="remove-sauce-labs-bike-light"]',
                '[data-test="remove-sauce-labs-bolt-t-shirt"]',
                '[data-test="remove-sauce-labs-fleece-jacket"]',
                '[data-test="remove-sauce-labs-onesie"]',
                '[data-test="remove-test.allthethings()-t-shirt-(red)"]'
              ];
  cartBadge = '[data-test="shopping-cart-badge"]';
  sortDropdown = '.product_sort_container';

//   add product
  async addFirstProductToCart() {
    for (let i = 0; i < this.addToCartBtn.length; i++) {
      await this.page.locator(this.addToCartBtn[i]).click();
    }
  }

//   remove product
  async removeFirstProductFromCart() {
    for (let j = 0; j < this.addToCartBtn.length; j++) {
      await this.page.locator(this.removeBtn[j]).click();
    }
  }

  async sortBy(value: string) {
    await this.page.selectOption(this.sortDropdown, value);
  }
}