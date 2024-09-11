import { Locator, Page } from '@playwright/test'

export class LoginPagePW {

    readonly page: Page
    readonly signinButton: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
       

    constructor(page: Page) {
        this.page = page
        this.signinButton = page.locator('.user-info')
        this.emailField = page.locator('#field-email')
        this.passwordField = page.locator('#field-password')
        this.submitButton = page.locator('#submit-login')
    }

    async login(emailAddress: string, userPassword: string) {
        await this.signinButton.click()
        await this.emailField.fill(emailAddress)
        await this.passwordField.fill(userPassword)
        await this.submitButton.click()
    }

    async goTo(url: string) {
        await this.page.goto(url)
    }

    async isDisplayed(): Promise<boolean> {
        return await this.page.locator('header').isVisible()
    }

}