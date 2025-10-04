import { Page, Locator, expect } from "@playwright/test";
export class LoginPage {
  private readonly createAccountButton: Locator;
  private readonly email: Locator;
  private readonly password: Locator;
  private readonly reEnterPassword: Locator;
  private readonly verifyButton: Locator;
  private readonly securityCode: Locator;
  private readonly verifyOtp: Locator;
  private readonly continue: Locator;
  private readonly proceedToCreate: Locator;
  private readonly name: Locator;
  private readonly proceedAccount: Locator;
  constructor(public readonly page: Page) {
    this.createAccountButton = this.page.getByRole('link', { name: 'Create your Amazon account' });
    this.email = this.page.locator('//input[@name="email"]');
    this.password = this.page.locator('input#ap_password');
    this.reEnterPassword = this.page.locator('input#ap_password_check');
    this.verifyButton = this.page.getByRole('button', { name: 'Continue Verify mobile number' });
    this.securityCode = this.page.getByRole('textbox', { name: 'Enter security code' });
    this.verifyOtp = this.page.getByRole('button', { name: 'Verify OTP Button' });
    this.continue = this.page.locator('//span[@id="continue"]');
    this.proceedToCreate = this.page.locator('//input[@type="submit"]');
    this.name = this.page.locator('//input[@placeholder="First and last name"]');
    this.proceedAccount = this.page.locator("//input[@type='submit']");
  }
  async createAccount(name: string, email: string, password: string) {
    if(!await this.createAccountButton.isVisible()) {
      await this.email.fill(email);
      await this.continue.click();
      await this.proceedToCreate.click();
      await this.name.fill(name);
      await this.email.fill(email);
      await this.password.fill(password);
      await this.reEnterPassword.fill(password);
      await this.verifyButton.click();
    }else{
    await this.createAccountButton.click();
    await this.name.fill(name);
    await this.email.fill(email);
    // await this.continue.click();
    await this.password.fill(password);
    await this.reEnterPassword.fill(password);
    await this.verifyButton.click();
    }
  }
  
  async proceedToCreateAccount(){
    await this.page.waitForTimeout(3000);
    await this.proceedAccount.click();
  }

  async verifyOTP(){
    await expect
      .poll(
        async () => {
          console.log('Waiting for OTP...');
          return (await this.securityCode.inputValue()).length;
        },
        {
          intervals: [4_000, 8_000, 12_000, 16_000],
          timeout: 180000,
          message: "OTP not entered within the time limit",
        },
      )
      .toBeGreaterThan(5);

    console.log('OTP detected, clicking verify button...');
    await this.verifyOtp.click();
  }
}