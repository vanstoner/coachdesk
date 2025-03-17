import { test } from './fixtures/withClearedDB.js';
import { expect } from '@playwright/test';

test('homepage shows CoachDesk heading', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toHaveText('CoachDesk');
});

