import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ClothesMenPage extends BasePage{

    readonly menSection: Locator
    

    constructor(page: Page) {
        super(page)
        this.menSection = page.locator('#content-wrapper')
    }

    async isDisplayed(): Promise<boolean> {
        return await this.menSection.isVisible()
    }

    selectMenClothes() {
        console.log('placeholder for selectMenClothes')
    }

}