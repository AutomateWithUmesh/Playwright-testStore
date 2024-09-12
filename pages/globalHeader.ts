import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class GlobalHeader extends BasePage{

    readonly signoutButton: Locator

    constructor(page: Page) {
        super(page)
        this.signoutButton = this.page.locator('[class="logout hidden-sm-down"]')
        //this.signoutButton = page.locator('text="Sign Out"')

    }

    async signOut() {
        await this.signoutButton.click();
    }

    async isDisplayed(): Promise<boolean> {
        return await this.signoutButton.isVisible()
    }
}