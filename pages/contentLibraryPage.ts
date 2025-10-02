import { Page, Locator, expect } from "@playwright/test";
export class ContentLibraryPage {
  private readonly signInButton: Locator;
  private readonly tab: (tabName: string) => Locator;
  private readonly preferencesTab: Locator;


  constructor(public readonly page: Page) {
    this.signInButton = this.page.getByRole('link', { name: 'Sign in', exact: true });
    this.tab = (tabName: string) => this.page.getByRole('link', { name: `${tabName}` });
    this.preferencesTab = this.page.locator('//a[contains(@href,"hz/mycd/preferences")]');
  }
    async goToTab(tabName: string) {
        await this.tab(tabName).click();
    }
    async goToPreferences() {
        await this.preferencesTab.click();
    }

}
