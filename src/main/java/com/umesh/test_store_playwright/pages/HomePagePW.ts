import { Page } from '@playwright/test';
import { BasePagePW } from './BasePagePW';

export class HomePagePW extends BasePagePW{

    constructor(page: Page) {
        super(page)
    }

    async isDisplayed(): Promise<boolean> {
        return await this.page.locator('header').isVisible()
    }

    // Add HomePage-specific methods here
}
