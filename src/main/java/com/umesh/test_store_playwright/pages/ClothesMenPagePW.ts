import { Locator, Page } from '@playwright/test';
import { BasePagePW } from './BasePagePW';

export class ClothesMenPagePW extends BasePagePW{

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