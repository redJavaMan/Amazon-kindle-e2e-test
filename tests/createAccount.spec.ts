import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ContentLibraryPage } from '../pages/contentLibraryPage';
import { HomePage } from '../pages/homePage';
import { PreferencesPage } from '../pages/preferencesPage';

test('Create Account', async ({ page }) => {
  let loginPage=new LoginPage(page);
  let homePage=new HomePage(page);
  let contentLibraryPage=new ContentLibraryPage(page);
  let preferencesPage=new PreferencesPage(page);
  await homePage.goto();
  await homePage.goToSignIn();
  await loginPage.proceedToCreateAccount();
  await loginPage.createAccount("mdlukman", "mdlukman+ukpppppppo@amazon.com", "kindleda",);
  await homePage.dismissPopupIfPresent();
  await homePage.goToContentLibrary();
  await contentLibraryPage.goToPreferences();
  await preferencesPage.setAddress('Mohammed Lukmanudhin','Street 1', `${process.env.CITY}`, `${process.env.STATE}` , `${process.env.POSTALCODE}`, '9876543210');
  await preferencesPage.addCard();
});


