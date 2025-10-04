import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ContentLibraryPage } from '../pages/contentLibraryPage';
import { HomePage } from '../pages/homePage';
import { PreferencesPage } from '../pages/preferencesPage';
import { ENV } from '../utils/env';
import { UserGenerator } from '../utils/userInformations';
import {ai} from '@zerostep/playwright'

let loginPage:LoginPage;
let homePage:HomePage;
let contentLibraryPage:ContentLibraryPage;
let preferencesPage:PreferencesPage;
const { name, email, password, phone, card } = UserGenerator.generateUser();

test.beforeEach(async ({ page }) => {
  loginPage=new LoginPage(page);
  homePage=new HomePage(page);
  contentLibraryPage=new ContentLibraryPage(page);
  preferencesPage=new PreferencesPage(page);
  await homePage.goto();
});

test('Create Account', async ({ page }) => {
  const aiArgs = { page, test}
  await homePage.dismissPopupIfPresent();
  await homePage.changeLanguageToEnglishIfNot();
  await homePage.goToSignIn();
  await loginPage.proceedToCreateAccount();
  await loginPage.createAccount(name, email, password,);
  await loginPage.verifyOTP();
  await homePage.dismissPopupIfPresent();
  await homePage.goToContentLibrary();
  await contentLibraryPage.goToPreferences();
  await preferencesPage.setAddress(name,'Street 1', 
    `${ENV.CITY}`, 
    `${ENV.STATE}` , 
    `${ENV.POSTAL_CODE}`, 
    `${phone}`);
  await preferencesPage.addCard();
  console.log('Account created successfully');
  console.log(`Account Details:
  Email: ${email}
  Password: ${password}
  Address: ${ENV.CITY}, ${ENV.STATE}, ${ENV.COUNTRY}, ${ENV.POSTAL_CODE},
  Phone: ${phone},
  Card: ${card.number}, Expiry: ${card.expiry}
  `);
});

test('Create Account with Zero Step AI', async ({ page }) => {
  const aiArgs = { page, test};
  // Handle any initial popups
  await page.waitForTimeout(3000);
  await homePage.dismissPopupIfPresent();

  // Change language to English if needed
  await homePage.changeLanguageToEnglishIfNot();
  await page.waitForTimeout(2000);
  // Navigate to sign in
  await ai('Hover over Account & Lists and click Sign in', aiArgs);
  
  // Create account
  await ai(`Enter the email in the ${email} field and click Continue`, aiArgs);
  await ai(`Click "Proceed to create an account"`, aiArgs);
  
  // Fill in account details
  await ai(`Enter the name "${name}" in the name field`, aiArgs);
  await ai(`Enter the email "${email}" in the email field`, aiArgs);
  await ai(`Enter the password "${password}" in the password field`, aiArgs);
  await ai(`Re-enter the password "${password}" in the re-enter password field`, aiArgs);
  await ai('Click the Continue button', aiArgs);
  
  // Wait for OTP (manual entry)
  console.log('Please enter the OTP manually in the security code field...');
  await loginPage.verifyOTP();
  // Handle any post-login popups
  await page.waitForTimeout(3000);
  await homePage.dismissPopupIfPresent();
  
  // Navigate to Content Library
  await homePage.goToContentLibrary();
  
  // Go to Preferences
  await ai('Click on the Preferences in secondary header', aiArgs);
  
  // Set address
  await preferencesPage.setAddress(name,'Street 1', 
    `${ENV.CITY}`, 
    `${ENV.STATE}` , 
    `${ENV.POSTAL_CODE}`, 
    `${phone}`);
  
  // Add payment card
  await ai('Click on "Your Payments" in Digital Payment Settings', aiArgs);
  await ai('Click on the option to change or add a payment method', aiArgs);
  await page.waitForTimeout(5000);
  await ai('Click on Add a credit or debit card', aiArgs);
  
  // Fill card details (may need to handle iframe)
  await ai(`Enter "${name}" in the name on card field`, aiArgs);
  await ai(`Enter "${card.number}" in the card number field`, aiArgs);
  await ai(`Select expiration year ${card.expiry}`, aiArgs);
  await ai('Click Add your card or similar button', aiArgs);
  await ai('Click Use this address button', aiArgs);
  await ai('Click Continue button to confirm payment method', aiArgs);
  
  console.log('Account created successfully');
  console.log(`Account Details:
  Email: ${email}
  Password: ${password}
  Address: ${ENV.CITY}, ${ENV.STATE}, ${ENV.COUNTRY}, ${ENV.POSTAL_CODE},
  Phone: ${phone},
  Card: ${card.number}, Expiry: ${card.expiry}
  `);
});

test('Sign In with Zero Step AI', async ({ page }) => {
  const aiArgs = { page, test};
  // Handle any initial popups
  await page.waitForTimeout(3000);
  await homePage.dismissPopupIfPresent();

  // Change language to English if needed
  await homePage.changeLanguageToEnglishIfNot();
  
  // Navigate to sign in
  await homePage.goToSignIn();
  
  // Create account
  await ai(`Enter "xyzabc+us@gmail.com" in the email field and click Continue`, aiArgs);
  await ai(`Enter "xxxxx" in the password field and click Verify`, aiArgs);
  
   await ai('Hover over Account & Lists and click Content Library', aiArgs);
  
  // Go to Preferences
  await ai('Click on the Preferences tab', aiArgs);
  
  // Set address
  await ai('Click on Change country/region', aiArgs);
  await ai('Click the Change button', aiArgs);
  await ai(`Enter "${name}" in the full name field`, aiArgs);
  await ai('Enter "Street 1" in the address line 1 field', aiArgs);
  await ai(`Enter "${ENV.CITY}" in the city field`, aiArgs);
  await ai(`Enter "${ENV.STATE}" in the state or county field`, aiArgs);
  await ai(`Enter "${ENV.POSTAL_CODE}" in the postal code field`, aiArgs);
  await ai('Enter "9876543210" in the phone number field', aiArgs);
  await ai('Click the Update button', aiArgs);
  
  // Add payment card
  await ai('Click on Your Payments link', aiArgs);
  await ai('Click on the option to change or add a payment method', aiArgs);
  await page.waitForTimeout(5000);
  await ai('Click on Add a credit or debit card', aiArgs);
  
  // Fill card details (may need to handle iframe)
  await ai(`Enter "${name}" in the name on card field`, aiArgs);
  await ai(`Enter "${card.number}" in the card number field`, aiArgs);
  await ai(`Select expiration year ${card.expiry}`, aiArgs);
  await ai('Click Add your card or similar button', aiArgs);
  await ai('Click Use this address button', aiArgs);
  await ai('Click Continue button to confirm payment method', aiArgs);
  
  console.log('Account created successfully');
  console.log(`Account Details:
  Email: ${email}
  Password: ${password}
  Address: ${ENV.CITY}, ${ENV.STATE}, ${ENV.COUNTRY}, ${ENV.POSTAL_CODE},
  Phone: ${phone},
  Card: ${card.number}, Expiry: ${card.expiry}
  `);
});


test.afterEach(async ({ page }) => {
  await page.close();
});