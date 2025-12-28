import { test, expect } from '@playwright/test';
import { LoginPage } from './PageObjectModel/login.page';
import { ProductsPage } from './PageObjectModel/product.page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login('standard_user', 'secret_sauce');
});


test('Add product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addFirstProductToCart();
  await expect(page.locator(productsPage.cartBadge)).toHaveText('6');
});

test('Remove product from cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addFirstProductToCart();
  await productsPage.removeFirstProductFromCart();

  await expect(page.locator(productsPage.cartBadge)).toHaveCount(0);
});

test('Sort product by price low to high', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortBy('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);
  expect(numericPrices).toEqual(sortedPrices);
});

test('Sort product by price high to low', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortBy('hilo');

  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

  const sortedPrices = [...numericPrices].sort((a, b) => b - a);
  expect(numericPrices).toEqual(sortedPrices);
});

test('Sort product by name A to Z', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortBy('az');

  const names = await page.locator('.inventory_item_name').allTextContents();
  const sortedNames = [...names].sort();
  expect(names).toEqual(sortedNames);
});

test('Sort product by name Z to A', async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.sortBy('za');

  const names = await page.locator('.inventory_item_name').allTextContents();
  const sortedNames = [...names].sort().reverse();
  expect(names).toEqual(sortedNames);
});