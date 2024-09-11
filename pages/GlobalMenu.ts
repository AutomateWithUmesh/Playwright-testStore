import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class GlobalMenu extends BasePage{

    readonly clothesPageLink: Locator
    readonly myStoreLogo: Locator
    readonly searchTextBox: Locator
    readonly searchResult: Locator

    constructor(page: Page) {
        super(page)
        this.clothesPageLink = this.page.locator('selector-for-clothes-page')
        this.myStoreLogo = this.page.locator('.logo')
        this.searchTextBox = this.page.locator('.ui-autocomplete-input')
        this.searchResult = this.page.locator('#js-product-list-header')
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