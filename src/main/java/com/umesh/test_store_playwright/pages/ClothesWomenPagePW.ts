import { Page } from '@playwright/test';

export class GlobalMenuPW {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

}