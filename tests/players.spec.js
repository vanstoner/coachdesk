import { test } from './fixtures/withClearedDB.js';
import { expect } from '@playwright/test';

test.describe('Player management', () => {
  test('can add a player and display it in the list', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Player Name').fill('Ella');
    await page.getByLabel('Position').fill('Forward');
    await page.getByRole('button', { name: 'addPlayerButton' }).click();

    const playerTable = page.getByRole('table', { name: 'playerTable' });
    await expect(playerTable).toContainText('Ella');
    await expect(playerTable).toContainText('Forward');
  });

  test('can delete a player', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Player Name').fill('Rafi');
    await page.getByLabel('Position').fill('Defender');
    await page.getByRole('button', { name: 'addPlayerButton' }).click();

    const playerTable = page.getByRole('table', { name: 'playerTable' });
    await expect(playerTable).toContainText('Rafi');

    await page.getByRole('button', { name: 'deletePlayerButton-Rafi' }).click();
    await expect(playerTable).not.toContainText('Rafi');
  });
});
