import { Page } from '@playwright/test';

export abstract class BasePagePW {

    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract isDisplayed(): Promise<boolean>;

}