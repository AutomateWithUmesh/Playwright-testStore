import { test, expect } from '@playwright/test';
import { LoginPagePW } from '../src/main/java/com/umesh/test_store_playwright/pages/LoginPagePW';
import { GlobalMenuPW } from '../src/main/java/com/umesh/test_store_playwright/pages/GlobalMenuPW';
import { GlobalHeaderPW } from '../src/main/java/com/umesh/test_store_playwright/pages/GlobalHeaderPW';
import Config from '../util/Config'
import * as fs from 'fs'

let loginPage: LoginPagePW
let globalMenu: GlobalMenuPW
let globalHeader: GlobalHeaderPW

Config.initialize()
const testData = JSON.parse(fs.readFileSync('./test-data/tc001.json', 'utf-8'));

test.describe('Application Tests TC001', () => {

    test.beforeEach(async ({ page }) => {
        const url = Config.get('test.store.url')
        if (!url) {
            throw new Error('URL not defined in the configuration.');
        }
        await page.goto(url)
        loginPage = new LoginPagePW(page)
        globalMenu = new GlobalMenuPW(page)
        globalHeader = new GlobalHeaderPW(page)
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

    test.afterEach(async ({ page }) => {
        await globalHeader.signOut()
    })
})