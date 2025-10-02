import { Page, Locator, expect } from "@playwright/test";
export class PreferencesPage {
  private readonly changeCountry: Locator;
  private readonly changeButton: Locator;
  private readonly address1Field: Locator;
  private readonly cityField: Locator;
  private readonly signInButton: Locator;
  private readonly countryField: Locator;
  private readonly postalCodeField: Locator;
  private readonly phnoField: Locator;
  private readonly updateButton: Locator;
  private readonly yourPayment: Locator;
  private readonly addACard: Locator;
  private readonly nameOnCard: Locator;
  private readonly cardNo: Locator;
  private readonly expiry: Locator;
  private readonly name: Locator;
  private readonly state: Locator;
  constructor(public readonly page: Page) {
    this.changeCountry = this.page.locator('(//div[@class="myx-row"])[3]//child::div[3]/i');
    this.changeButton = this.page.locator('//button[@aria-label="Change"]');
    this.address1Field = this.page.locator('input#adr_AddressLine1');
    this.cityField = this.page.locator('input#adr_City');
    this.signInButton = this.page.getByRole('link', { name: 'Sign in', exact: true });
    this.countryField = this.page.getByRole('textbox', { name: 'County:' });
    this.postalCodeField = this.page.locator('input#adr_PostalCode');
    this.phnoField = this.page.locator('input#adr_PhoneNumber');
    this.updateButton = this.page.locator('//span[text()=" Update "]');
    this.yourPayment = this.page.getByRole('link', { name: 'Your Payments' });
    this.addACard = this.page.getByRole('link', { name: 'Add a credit or debit card' });
    this.nameOnCard = this.page.locator('iframe[name="ApxSecureIframe-pp-AldJoC-46"]').contentFrame().getByRole('textbox', { name: 'Name on card' });
    this.cardNo = this.page.locator('iframe[name="ApxSecureIframe-pp-AldJoC-46"]').contentFrame().getByRole('textbox', { name: 'Card number' });
    this.name = this.page.locator('input#adr_FullName')
    this.state = this.page.locator('input#adr_StateOrRegion');
  }
async setAddress(name: string, address1: string, city: string, state: string, postalCode: string, phoneNumber: string) {
    await this.changeCountry.click();
    await this.changeButton.click();
    await this.name.fill(name);
    await this.address1Field.fill(address1);
    await this.cityField.fill(city);
    await this.state.fill(state);
    await this.postalCodeField.fill(postalCode);
    await this.phnoField.fill(phoneNumber);
    await this.updateButton.click();
}
async addCard() {
    await this.yourPayment.click();
    await this.addACard.click();
    await this.nameOnCard.fill('Mohammed Lukmanudhin');
    await this.cardNo.fill('4444333322221111');
  }
}
