import { Page, Locator, expect } from "@playwright/test";
export class HomePage {
  private readonly accountAndLists: Locator;
  private readonly menu: (menuName: string) => Locator;
  private readonly signInButton: Locator;
  private readonly contentLibrary: Locator;
  private readonly dismissButton: Locator;
  constructor(public readonly page: Page) {
    this.accountAndLists = this.page.locator('span#nav-link-accountList-nav-line-1');
    this.menu = (menuName: string) => this.page.getByRole('link', { name: `${menuName}` });
    this.contentLibrary = this.page.locator('//a[contains(@href,"hz/mycd/myx?pageType=content")]');
    this.signInButton = this.page.getByRole('link', { name: 'Sign in', exact: true });
    this.dismissButton = this.page.locator("//input[@data-action-type='DISMISS']");
  }
  async goToMenu(menuName: string) {
    await this.accountAndLists.hover();
    await this.menu(menuName).click();
  }
  async goto() {
    await this.page.goto(`${process.env.BASE_URL}`);
  }
  async goToSignIn() {
    await this.signInButton.click();
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
  }
}
