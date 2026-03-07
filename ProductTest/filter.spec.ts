import { test, expect } from "@playwright/test";
import { LoginPage } from "../PageObjectModel/login.page";
import { FileterProduct } from "../PageObjectModel/filter.page";

// store credentials in variables
const link = "https://www.saucedemo.com/";
const username = "standard_user";
const password = "secret_sauce";

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto(link);
  await loginPage.login(username, password);
});

test("Sort product by price low to high", async ({ page }) => {
  const filterPage = new FileterProduct(page);

  await filterPage.sortBy("lohi");

  const prices = await page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

  const sortedPrices = [...numericPrices].sort((a, b) => a - b);
  expect(numericPrices).toEqual(sortedPrices);
});

test("Sort product by price high to low", async ({ page }) => {
  const filterPage = new FileterProduct(page);

  await filterPage.sortBy("hilo");

  const prices = await page.locator(".inventory_item_price").allTextContents();
  const numericPrices = prices.map((p) => parseFloat(p.replace("$", "")));

  const sortedPrices = [...numericPrices].sort((a, b) => b - a);
  expect(numericPrices).toEqual(sortedPrices);
});

test("Sort product by name A to Z", async ({ page }) => {
  const filterPage = new FileterProduct(page);

  await filterPage.sortBy("az");

  const names = await page.locator(".inventory_item_name").allTextContents();
  const sortedNames = [...names].sort();
  expect(names).toEqual(sortedNames);
});

test("Sort product by name Z to A", async ({ page }) => {
  const filterPage = new FileterProduct(page);

  await filterPage.sortBy("za");

  const names = await page.locator(".inventory_item_name").allTextContents();
  const sortedNames = [...names].sort().reverse();
  expect(names).toEqual(sortedNames);
});
