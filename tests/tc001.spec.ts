import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { GlobalMenu } from '../pages/GlobalMenu';
import { GlobalHeader } from '../pages/GlobalHeader';
import Config from '../util/Config'
import * as fs from 'fs'

let loginPage: LoginPage
let globalMenu: GlobalMenu
let globalHeader: GlobalHeader

Config.initialize()
const testData = JSON.parse(fs.readFileSync('./test-data/tc001.json', 'utf-8'));

test.describe('Application Tests TC001', () => {

    test.beforeEach(async ({ page }) => {
        const url = Config.get('test.store.url')
        if (!url) {
            throw new Error('URL not defined in the configuration.');
        }
        await page.goto(url)
        loginPage = new LoginPage(page)
        globalMenu = new GlobalMenu(page)
        globalHeader = new GlobalHeader(page)
    })

    test('login to application', async ({ page }) => {
        const username = Config.get('credentials.username') // Load credentials from config
        const password = Config.get('credentials.password')
        if (!username || !password) {
            throw new Error('Userame or Password not defined in the configuration.');
        }
        await loginPage.login(username, password);
        await globalMenu.searchItem(testData.searchText)
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== 'passed') {
            // Capture screenshot if the test failed
            const screenshotPath = `./screenshots/${testInfo.title.replace(/\s+/g, '_')}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot taken for failed test: ${screenshotPath}`);
            
            // Optionally, attach the screenshot to the test report
            testInfo.attachments.push({
                name: 'screenshot',
                path: screenshotPath,
                contentType: 'image/png'
            });
        }
        // Sign out after each test
        await globalHeader.signOut()
    })
})