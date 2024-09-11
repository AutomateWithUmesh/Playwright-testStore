import { Page } from '@playwright/test';

export class ClothesWomenPage {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

}