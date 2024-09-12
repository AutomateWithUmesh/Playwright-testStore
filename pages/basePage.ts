import { Page } from '@playwright/test';

export abstract class BasePage {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract isDisplayed(): Promise<boolean>;

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

}