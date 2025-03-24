import { test, expect } from '@playwright/test';

test.describe('Match management', () => {
  test('can add a match with result, home/away, and completed fields', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('matchDate').fill('2025-03-30');
    await page.getByLabel('opponent').fill('U8 Falcons');
    await page.getByLabel('homeScore').selectOption('3');
    await page.getByLabel('awayScore').selectOption('1');
    await page.getByLabel('homeToggle').check(); // or 'away' if needed
    await page.getByLabel('completed').check();

    await page.getByLabel('addMatchButton').click();

    const table = page.getByLabel('matchTable');
    await expect(table).toContainText('U8 Falcons');
    await expect(table).toContainText('3 - 1');
    await expect(table).toContainText('home'); // checks home/away label
    await expect(table).toContainText('Yes');  // checks completed status
  });
});

