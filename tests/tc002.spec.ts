import { expect } from '@playwright/test';
import test from '../fixtures/fixtures'
import { LoginPage } from '../pages/LoginPage';
import { GlobalMenu } from '../pages/GlobalMenu';
import { GlobalHeader } from '../pages/GlobalHeader';
import Config from '../util/Config'
import Logger from '../util/Logger';

import * as fs from 'fs'

let loginPage: LoginPage
let globalMenu: GlobalMenu
let globalHeader: GlobalHeader

//Config.initialize()
//const logger = Logger.getLogger();  // Get the logger instance
const testData = JSON.parse(fs.readFileSync('./test-data/tc002.json', 'utf-8'));

test.describe('Application Tests TC002', () => {

    // test.beforeEach(async ({ page, loginPage, logger }) => {
    //     const url = Config.get('test.store.url')
    //     if (!url) {
    //         throw new Error('URL not defined in the configuration.');
    //     }
    //     await page.goto(url)
    //     loginPage = new LoginPage(page)
    //     globalMenu = new GlobalMenu(page)
    //     globalHeader = new GlobalHeader(page)
    //     logger.info('Navigated to the application and initialized page objects.');
    // })

    test('login to application', async ({ page, logger }) => {
        loginPage = new LoginPage(page)
        globalMenu = new GlobalMenu(page)
        globalHeader = new GlobalHeader(page)
        const username = Config.get('credentials.username') // Load credentials from config
        const password = Config.get('credentials.password')
        if (!username || !password) {
            throw new Error('Userame or Password not defined in the configuration.');
        }
        await loginPage.login(username, password);
        logger.info('Logged in with the provided credentials.');
        const isLoginSuccessful = await loginPage.isDisplayed(); // Call the method
        expect(isLoginSuccessful).toBe(false);  // Assert if the condition is true
        await globalMenu.searchItem(testData.searchText)
        logger.info('Searched for the item: ' + testData.searchText);
    });

    test.afterEach(async ({ page, logger }, testInfo) => {
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
        await globalHeader.signOut()
        logger.info('Signed out after the test.');
    })


})