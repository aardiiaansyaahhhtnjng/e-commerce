import { Page } from '@playwright/test';

export class FileterProduct {
  constructor(private page: Page) {}

  sortDropdown = '.product_sort_container';

  async sortBy(value: string) {
    await this.page.selectOption(this.sortDropdown, value);
  }
}