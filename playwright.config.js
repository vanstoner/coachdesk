import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 10000,
  retries: 0,
  use: {
    headless: true,
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'vite --mode test',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});

