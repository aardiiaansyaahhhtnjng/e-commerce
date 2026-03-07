import { test, expect } from "@playwright/test";
import { LoginPage } from "./PageObjectModel/login.page";
import { ProductsPage } from "./PageObjectModel/product.page";

// store credentials in variables
const username = 'normal_user';
const password = 'secret_sauce';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://www.saucedemo.com/');
  await loginPage.login(username, password);
});

test("Add product to cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addFirstProductToCart();
  await expect(page.locator(productsPage.cartBadge)).toHaveText("6");
});

test("Remove product from cart", async ({ page }) => {
  const productsPage = new ProductsPage(page);

  await productsPage.addFirstProductToCart();
  await productsPage.removeFirstProductFromCart();

  await expect(page.locator(productsPage.cartBadge)).toHaveCount(0);
});