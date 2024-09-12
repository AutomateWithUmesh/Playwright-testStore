import { expect } from '@playwright/test';
import test from '../fixtures/fixtures'
import { PageManager } from '../pages/pageManager';
import Config from '../util/Config'
import * as fs from 'fs'


const testData = JSON.parse(fs.readFileSync('./test-data/tc002.json', 'utf-8'));

test.describe('Application Tests TC001', () => {

/**
 * Opening the URL is handled as part of fixure. Fixures are like hooks used for Before and After
 */

    test('login to application', async ({ page, logger }) => {
        const pm = new PageManager(page)
        const username = Config.get('credentials.username') // Load credentials from config
        const password = Config.get('credentials.password')
        if (!username || !password) {
            throw new Error('Userame or Password not defined in the configuration.');
        }
        await pm.getLoginPage().login(username, password);
        logger.info('Logged in with the provided credentials.');
        const isLoginSuccessful = await pm.getLoginPage().isDisplayed(); // Call the method
        expect(isLoginSuccessful).toBe(false);  // Assert if the condition is true
        await pm.getGlobalMenu().searchItem(testData.searchText)
        logger.info('Searched for the item: ' + testData.searchText);
    });

    test.afterEach(async ({ page, logger }, testInfo) => {
        const pm = new PageManager(page)
        if (testInfo.status !== 'passed') {
            // Capture screenshot if the test failed
            const screenshotPath = `./screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            logger.info(`Screenshot taken for failed test: ${screenshotPath}`);

            // Optionally, attach the screenshot to the test report
            testInfo.attachments.push({
                name: 'screenshot',
                path: screenshotPath,
                contentType: 'image/png'
            });
        }
        // Sign out after each test
        await pm.getGlobalHeader().signOut()
        logger.info('Signed out after the test.');
    })


})