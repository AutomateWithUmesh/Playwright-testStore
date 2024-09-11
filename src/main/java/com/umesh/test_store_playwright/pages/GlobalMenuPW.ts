import { Locator, Page } from '@playwright/test';
import { BasePagePW } from './BasePagePW';

export class GlobalMenuPW extends BasePagePW{

    readonly clothesPageLink: Locator
    readonly myStoreLogo: Locator
    readonly searchTextBox: Locator
    readonly searchResult: Locator

    constructor(page: Page) {
        super(page)
        this.clothesPageLink = page.locator('selector-for-clothes-page')
        this.myStoreLogo = page.locator('.logo')
        this.searchTextBox = page.locator('.ui-autocomplete-input')
        this.searchResult = page.locator('#js-product-list-header')
    }

    async isDisplayed(): Promise<boolean> {
        return await this.myStoreLogo.isVisible()
    }

    async goToClothesPage() {
        // Logic to navigate to Clothes Page
        await this.clothesPageLink.click() // Replace with actual selector
      }

    async clickMyStoreLogo() {
        await this.myStoreLogo.click();
    }

    async searchItem(searchText: string) {
        await this.searchTextBox.fill(searchText);
    }
}