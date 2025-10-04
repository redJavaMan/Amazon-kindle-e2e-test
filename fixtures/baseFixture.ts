import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { HomePage } from "../pages/homePage";
import { ContentLibraryPage } from "../pages/contentLibraryPage";
import { PreferencesPage } from "../pages/preferencesPage";

type baseFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
  contentLibraryPage: ContentLibraryPage;
  preferencesPage: PreferencesPage;
};

export const test = base.extend<baseFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  contentLibraryPage: async ({ page }, use) => {
    await use(new ContentLibraryPage(page));
  },
  preferencesPage: async ({ page }, use) => {
    await use(new PreferencesPage(page));
  },
});

export const expect = test.expect;
