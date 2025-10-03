import { Page, Locator, expect } from "@playwright/test";
import { ENV } from "../utils/env";
export class HomePage {
  private readonly accountAndLists: Locator;
  private readonly menu: (menuName: string) => Locator;
  private readonly signInButton: Locator;
  private readonly contentLibrary: Locator;
  private readonly dismissButton: Locator;
  private readonly languageSettings: Locator;
  private readonly englishRadioBtn: Locator;
  private readonly addressPopup: Locator;
  private readonly rejectCookie: Locator;
  private readonly continueShoppingButton: Locator;
  constructor(public readonly page: Page) {
    this.accountAndLists = this.page.locator('span#nav-link-accountList-nav-line-1');
    this.menu = (menuName: string) => this.page.getByRole('link', { name: `${menuName}` });
    this.contentLibrary = this.page.locator('//a[contains(@href,"hz/mycd/myx?pageType=content")]');
    this.signInButton = this.page.locator('(//a[@class="nav-action-signin-button"])[1]');
    this.dismissButton = this.page.locator("//input[@data-action-type='DISMISS']");
    this.languageSettings = this.page.locator('//a[contains(@aria-label,"Choose a language for shopping ")]');
    this.englishRadioBtn = this.page.locator('(//span[text()="English"]//preceding-sibling::i)[1]');
    this.addressPopup = this.page.locator('//input[contains(@data-action-type,"DISMISS")]');
    this.rejectCookie = this.page.locator('input#sp-cc-rejectall-link');
    this.continueShoppingButton = this.page.locator('//button[@alt="Continue shopping"]');
  }
  async goToMenu(menuName: string) {
    await this.accountAndLists.hover();
    await this.menu(menuName).click();
  }
  async goto() {
    await this.page.goto(`${process.env.BASE_URL}`);
    if (await this.continueShoppingButton.isVisible()) {
      await this.continueShoppingButton.click();
    }
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async goToSignIn() {
    await expect
      .poll(
        async () => {
          await this.accountAndLists.hover();
          return await this.signInButton.isVisible();
        },
        {
          intervals: [1_000, 2_000, 3_000],
          timeout: 15000,
          message: "SignIn button is not visible",
        },
      )
      .toBeTruthy();
    await this.signInButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
  async goToContentLibrary() {
    await this.accountAndLists.hover();
    await this.contentLibrary.click();
  }
  async dismissPopupIfPresent() {
    await this.page.waitForTimeout(3000);
    if (await this.dismissButton.isVisible()) {
      await this.dismissButton.click();
    }
    if (await this.addressPopup.isVisible()) {
      await this.addressPopup.click();
    }
    if (await this.rejectCookie.isVisible()) {
      await this.rejectCookie.click();
    }
  }
  async changeLanguageToEnglishIfNot() {
  console.log(ENV.LOCAL);
  if (!['us', 'uk', 'ptbr', 'esmx', 'ru'].includes(ENV.LOCAL)) {  
    await expect
      .poll(
        async () => {
          await this.languageSettings.hover();
          return await this.englishRadioBtn.isVisible();
        },
        {
          intervals: [1_000, 2_000, 3_000],
          timeout: 15000,
          message: "make sure language dropdown is visible",
        },
      )
      .toBeTruthy();
    await this.englishRadioBtn.click();
  }
}
}
