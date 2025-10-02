import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ContentLibraryPage } from '../pages/contentLibraryPage';
import { HomePage } from '../pages/homePage';
import { PreferencesPage } from '../pages/preferencesPage';
import { ENV } from '../utils/env';

test('Create Account', async ({ page }) => {
  let loginPage=new LoginPage(page);
  let homePage=new HomePage(page);
  let contentLibraryPage=new ContentLibraryPage(page);
  let preferencesPage=new PreferencesPage(page);
  // Account details:
  const name = "Mohammed Lukmanudhin";
  const email = "mdlukman+ukppppppppppppppppppppo@amazon.com";
  const password = "kindleda";
  await homePage.goto();
  await homePage.goToSignIn();
  await loginPage.proceedToCreateAccount();
  await loginPage.createAccount(name, email, password,);
  await homePage.dismissPopupIfPresent();
  await homePage.goToContentLibrary();
  await contentLibraryPage.goToPreferences();
  await preferencesPage.setAddress(name,'Street 1', 
    `${ENV.CITY}`, 
    `${ENV.STATE}` , 
    `${ENV.POSTAL_CODE}`, 
    '9876543210');
  await preferencesPage.addCard();
  console.log('Account created successfully');
  console.log(`Account Details:
  Email: ${email}
  Password: ${password}
  Address: ${ENV.CITY}, ${ENV.STATE}, ${ENV.COUNTRY}, ${ENV.POSTAL_CODE},
  Phone: 9876543210
  Card: 4444 3333 2222 1111, Expiry: 01/2029
  `);
});


