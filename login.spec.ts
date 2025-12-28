import { test, expect } from '@playwright/test';

test('choose credential', async ({ page }) => {
  // Navigate to the login page
  await page.goto('https://www.saucedemo.com/');

  // trying all posible credential combinations
  const Username = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user', ''];
  const Password = ['secret_sauce', ''];

  for (const user of Username) {
    for (const pass of Password) {
      // Fill in username and password
      await page.getByRole('textbox', { name: 'Username' }).fill(user);
      await page.getByRole('textbox', { name: 'Password' }).fill(pass);
      await page.getByRole('button', { name: 'Login' }).click();

      const cred = { username: user, password: pass };
      // Check if login was successful or if an error message is shown
      if (cred.username === 'locked_out_user') {
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
      //   await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
      } else if (cred.username === '' || cred.password === '') {
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        // await expect(errorMessage).toHaveText('Epic sadface: Password is required');
      } else {
        await expect(page).toHaveURL(/inventory.html/);
        // Log out to reset for the next iteration
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.getByRole('link', { name: 'Logout' }).click();
      }
    }
  }
});