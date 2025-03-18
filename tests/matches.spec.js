import { test } from './fixtures/withClearedDB.js';
import { expect } from '@playwright/test';

test.describe('Match management', () => {
  test('can add a match and display it in the list', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Date').fill('2025-03-25');
    await page.getByLabel('Opponent').fill('U8 Tigers');
    await page.getByRole('button', { name: 'addMatchButton' }).click();

    const matchTable = page.getByRole('table', { name: 'matchTable' });
    await expect(matchTable).toContainText('U8 Tigers');
    await expect(matchTable).toContainText('2025-03-25');
  });

  test('can delete a match', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Date').fill('2025-04-01');
    await page.getByLabel('Opponent').fill('U8 Lions');
    await page.getByRole('button', { name: 'addMatchButton' }).click();

    const matchTable = page.getByRole('table', { name: 'matchTable' });
    await expect(matchTable).toContainText('U8 Lions');

    await page.getByRole('button', { name: 'deleteMatchButton-U8 Lions' }).click();
    await expect(matchTable).not.toContainText('U8 Lions');
  });
});

