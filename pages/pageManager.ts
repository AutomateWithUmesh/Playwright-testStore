import { Page } from '@playwright/test'
import { LoginPage } from './loginPage'
import { GlobalMenu } from './globalMenu';
import { GlobalHeader } from './globalHeader';

export class PageManager {

    private readonly page: Page
    private readonly loginPage: LoginPage
    private readonly globalMenu: GlobalMenu
    private readonly globalHeader: GlobalHeader

    constructor(page: Page) {
        this.page = page
        this.loginPage = new LoginPage(this.page)
        this.globalHeader = new GlobalHeader(this.page)
        this.globalMenu = new GlobalMenu(this.page)
    }

    getLoginPage() {
        return this.loginPage
    }

    getGlobalHeader() {
        return this.globalHeader
    }

    getGlobalMenu() {
        return this.globalMenu
    }
}
