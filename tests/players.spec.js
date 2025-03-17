import { test } from './fixtures/withClearedDB.js';
import { expect } from '@playwright/test';

test.describe('Player management', () => {
  test('can add a player and display it in the list', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Player Name').fill('Ella');
    await page.getByPlaceholder('Position').fill('Forward');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.locator('li')).toContainText('Ella');
    await expect(page.locator('li')).toContainText('Forward');
  });

  test('can delete a player', async ({ page }) => {
    await page.goto('/');

    await page.getByPlaceholder('Player Name').fill('Rafi');
    await page.getByPlaceholder('Position').fill('Defender');
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.locator('li')).toContainText('Rafi');
    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('li')).not.toContainText('Rafi');
  });
});

