// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../data/users.json');

users.forEach((user, index) => {
  test(`login test ${index + 1}: ${user.username} / ${user.password} -> ${user.expected}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    if (user.expected === 'success') {
      expect(await inventoryPage.isLoaded()).toBe(true);
    } else if (user.expected === 'error') {
      const errorText = await loginPage.getErrorMessage();
      expect(errorText.trim()).not.toBe('');
    }
  });
});