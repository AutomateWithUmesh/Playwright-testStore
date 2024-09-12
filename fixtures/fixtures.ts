import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import Config from '../util/Config';
import Logger from '../util/Logger';


// Extend Playwright test to include custom fixtures
type MyFixtures = {
  config: Config
  setup: string
  logger: ReturnType<typeof Logger.getLogger>
}

// Create the test object with fixtures
const test = baseTest.extend<MyFixtures>({

  setup: [
    async ({ page }, use) => {
      const url = Config.get('test.store.url')
      if (!url) {
        throw new Error('URL not defined in the configuration.');
      }
      await page.goto(url)
      await use('')
    },
    { auto: true }
  ],
  logger: async ({ }, use) => {
    const logger = Logger.getLogger();
    await use(logger)
  }
})

Config.initialize()

export default test;

/**
 * The { auto: true } option in Playwright’s extend method tells the framework to automatically initialize and run the fixture without needing to explicitly reference it in the test.
 * Use of { auto: true }:
 * Automatic Execution: If a fixture is defined with auto: true, it will be run automatically before any other fixtures or tests. You don't need to reference it explicitly in the test. This is useful for global setup tasks (like initializing configurations) that must be done every time, without manually invoking them.
 * Avoid Explicit Usage in Tests: Normally, a fixture is only initialized when it’s used as part of the test’s arguments, like in test('my test', async ({ myFixture }) => {...}). But with { auto: true }, the fixture will be invoked automatically for every test, regardless of whether it’s directly used in the test function.
 * Without auto: true, you would need to pass setup to every test like this:
 *    test('login to application', async ({ setup, loginPage }) => {
 *      // You can now use `setup` here
 *    });
 */