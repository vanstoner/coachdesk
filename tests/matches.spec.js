import { test } from './fixtures/withClearedDB.js';
import { expect } from '@playwright/test';

test.describe('Match management', () => {
  test('can add a match and display it in the list', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Date').fill('2025-03-25');
    await page.getByLabel('Opponent').fill('U8 Tigers');
    await page.getByRole('button', { name: 'Add Match' }).click();

    await expect(page.locator('li')).toContainText('U8 Tigers');
    await expect(page.locator('li')).toContainText('2025-03-25');
  });

  test('can select a match from the list', async ({ page }) => {
    await page.goto('/');
    await page.getByLabel('Date').fill('2025-04-01');
    await page.getByLabel('Opponent').fill('U8 Lions');
    await page.getByRole('button', { name: 'Add Match' }).click();

    // Select by accessible button-like list item
    await page.getByRole('button', { name: /Select match against U8 Lions/i }).click();
    // Optionally add an assertion for navigation or selection state
  });
});

