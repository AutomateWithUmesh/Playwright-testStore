import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ClothesPage extends BasePage{

    readonly clotheSection: Locator
    readonly menSection: Locator
    readonly womenSection: Locator


    constructor(page: Page) {
        super(page)
        this.clotheSection = page.locator('#js-product-list-header')
        this.menSection = page.locator('.category-sub-menu > li:nth-child(1) > a:nth-child(1)')
        this.womenSection = page.locator('.category-sub-menu > li:nth-child(2) > a:nth-child(1)')
    }

    async isDisplayed(): Promise<boolean> {
        return await this.clotheSection.isVisible()
    }


    async goToClothesMenPage() {
        await this.menSection.click();
    }

}