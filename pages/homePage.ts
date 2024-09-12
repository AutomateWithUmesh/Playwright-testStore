import { Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage{

    constructor(page: Page) {
        super(page)
    }

    async isDisplayed(): Promise<boolean> {
        return await this.page.locator('header').isVisible()
    }

    // Add HomePage-specific methods here
}
