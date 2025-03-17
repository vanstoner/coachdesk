import { test as base } from '@playwright/test';

const testDBName = process.env.VITE_DB_NAME || 'CoachDeskTestDB';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.goto('/');
    await page.evaluate((dbName) => {
      indexedDB.deleteDatabase(dbName);
    }, testDBName);

    await use(page);
  },
});

