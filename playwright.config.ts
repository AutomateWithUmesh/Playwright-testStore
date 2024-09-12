import { defineConfig } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  fullyParallel: false, //if true, then tests within a file will run parallely
  workers: process.env.CI ? 1 : undefined, 
  
 // workers are new instance of the webbrowser.
 // By default, playwright creates workers for each spec file and executes them in parallel
 // However, tests inside each spec file will be executed sequentially if fullyParallel: false
 // Playwright selected test spec files randomly
 //

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
