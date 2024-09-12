import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  reporter: 'html',
  
  use: {
      trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chrome'
    },

    {
      name: 'firefox',
      use: { 
        browserName: 'firefox'
      },
    },
  ],
});
