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
  private readonly changeLink: Locator;
  private readonly nameOnCard2: Locator;
  private readonly cardNo2: Locator;
  private readonly expiryYear: Locator;
  private readonly year: Locator;
  private readonly addCardButton: Locator;
  private readonly useThisAddressButton: Locator;
  private readonly continueButton: Locator;
  private readonly cardConfirmation: Locator;
  private readonly iframe;
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
    this.iframe = this.page.locator('//iframe[contains(@class,"apx-inline-secure-iframe pmts-portal-component")]').contentFrame();
    this.addACard = this.page.locator('//span[contains(@data-action,"add-credit-card")]//child::a');
    this.nameOnCard = this.page.locator('iframe[name="ApxSecureIframe-pp-AldJoC-46"]').contentFrame().getByRole('textbox', { name: 'Name on card' });
    this.cardNo = this.page.locator('iframe[name="ApxSecureIframe-pp-AldJoC-46"]').contentFrame().getByRole('textbox', { name: 'Card number' });
    this.name = this.page.locator('input#adr_FullName')
    this.state = this.page.locator('input#adr_StateOrRegion');
    this.changeLink = this.page.locator('//input[contains(@name,"PaymentMethod")]');
    this.nameOnCard2 = this.iframe.locator('//input[contains(@name,"accountHolderName")]');
    this.cardNo2 = this.iframe.locator('//input[contains(@name,"CardNumber")]');
    this.expiryYear = this.iframe.locator('//a[text()="2029"]');
    this.year = this.iframe.locator('//span[contains(@class,"expiry-year")]');
    this.addCardButton = this.iframe.locator('//input[contains(@name,"AddCreditCardEvent")]');
    this.useThisAddressButton = this.iframe.locator('//input[contains(@name,"SelectAddressEvent")]');
    this.continueButton = this.page.locator('//input[contains(@name,"PaymentOptionSelectionEvent")]');
    this.cardConfirmation = this.page.locator('//span[contains(text(),"1111")]');
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
    await this.changeLink.click();
    await expect(this.addACard).toBeEnabled({timeout:60000});
    await this.addACard.click();
    await this.nameOnCard2.fill('Mohammed Lukmanudhin');
    await this.cardNo2.fill('4444333322221111');
    await this.year.click();
    await this.expiryYear.click();
    await this.addCardButton.click();
    await this.useThisAddressButton.click();
    await this.continueButton.click();
    await this.page.waitForLoadState('networkidle');
    await expect(this.cardConfirmation).toBeVisible();
  }
}
