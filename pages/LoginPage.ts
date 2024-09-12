import { Locator, Page } from '@playwright/test'

export class LoginPage {

    readonly page: Page
    readonly signinButton: Locator
    readonly emailField: Locator
    readonly passwordField: Locator
    readonly submitButton: Locator
    readonly signoutButton: Locator
       

    constructor(page: Page) {
        this.page = page
        this.signinButton = page.locator('.user-info')
        this.emailField = page.locator('#field-email')
        this.signoutButton = this.page.locator('[class="logout hidden-sm-down"]')
/**
 * Different ways to identify locators
 * By Tag Name
 * page.locator('input')
 * 
 * By ID
 * page.locator('#field-email')
 * 
 * By Class value
 * page.locator('.form-control')
 * 
 * By Attribute
 * page.locator('[name="email"]')
 * 
 * By full class value
 * page.locator('[class="form-control"]')
 * 
 * Combine different selectors
 * page.locator('input[name="email"][type="email"]')
 * 
 * By partial text match
 * page.locator(':text("Email")')
 * 
 * By exact text match
 * page.locator(':text-is("Email")')
 * 
 * User Facing Locators:
 * 
 * By Role
 * page.getByRole('textbox', { name: 'Email' })
 * 
 * By Label
 * page.getByLabel('Email')
 * 
 * By Placeholder
 * page.getByPlaceholder('Enter your email')
 * 
 * By Title
 * page.getByTitle('email input field')
 * 
 * By TestID
 * page.getByTestId('emailInput')
 * 
 * Chaining Parent and Child Locators 
 * page.locator('form').locator('input[type="email"]')
 * page.locator('form').getByRole('textbox', { name: 'Email' })

 * 
 * 
 */


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
        return await this.signoutButton.isVisible()
    }

}