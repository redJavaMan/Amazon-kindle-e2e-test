# Amazon Zero Step Automation

A comprehensive Playwright-based test automation framework for Amazon Kindle with multi-environment support and AI-powered testing capabilities using ZeroStep.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [ZeroStep Playwright Setup](#zerostep-playwright-setup)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Test Scenarios](#test-scenarios)
- [Page Object Model](#page-object-model)
- [Troubleshooting](#troubleshooting)

## ✨ Features

- **Multi-Environment Support**: Test across 16+ Amazon marketplaces (US, UK, AU, IN, DE, FR, JP, CN, IT, NL, ES, MX, BR, CA, RU)
- **Page Object Model**: Clean, maintainable test architecture
- **AI-Powered Testing**: Integration with ZeroStep Playwright for natural language test automation
- **Comprehensive Test Coverage**: Account creation, address setup, payment card management
- **Cross-Browser Testing**: Support for Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests in parallel for faster feedback
- **Detailed Reporting**: HTML reports with screenshots and videos on failure
- **Dynamic User Generation**: Automatic test user data generation per environment

## 📁 Project Structure

```
amazon-kindle/
├── env/                          # Environment configuration files
│   ├── .env.us                   # US marketplace config
│   ├── .env.uk                   # UK marketplace config
│   ├── .env.au                   # Australia marketplace config
│   ├── .env.in                   # India marketplace config
│   └── ...                       # Other marketplace configs
├── pages/                        # Page Object Models
│   ├── homePage.ts              # Home page actions
│   ├── loginPage.ts             # Login/signup page actions
│   ├── contentLibraryPage.ts    # Content library actions
│   └── preferencesPage.ts       # Preferences page actions
├── tests/                        # Test specifications
│   └── createAccount.spec.ts    # Account creation tests
├── utils/                        # Utility functions
│   ├── env.ts                   # Environment variable handler
│   └── userInformations.ts      # Test user data generator
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies
└── zerostep.config.json         # ZeroStep configuration
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git** (for version control)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd amazon-zerostep-automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Verify installation**
   ```bash
   npx playwright --version
   ```

## 🤖 ZeroStep Playwright Setup

ZeroStep enables AI-powered test automation using natural language commands. Follow these steps to set it up:

### Step 1: Install ZeroStep

ZeroStep is already included in `package.json`, but if you need to install it separately:

```bash
npm i @zerostep/playwright -D
```

### Step 2: Get Your ZeroStep API Token

1. Visit [ZeroStep Dashboard](https://app.zerostep.com)
2. Sign up or log in to your account
3. Navigate to API Settings or Project Settings
4. Generate a new API token
5. Copy the token (format: `0step:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Configure ZeroStep

Update the `zerostep.config.json` file with your token:

```json
{
  "TOKEN": "0step:your-api-token-here"
}
```

**⚠️ Security Note**: Never commit your actual API token to version control. Consider using environment variables:

```json
{
  "TOKEN": "${ZEROSTEP_TOKEN}"
}
```

Then set the environment variable:
```bash
export ZEROSTEP_TOKEN="0step:your-api-token-here"
```

### Step 4: Import and Use ZeroStep in Tests

In your test files, import the `ai` function:

```typescript
import { ai } from '@zerostep/playwright';

test('example test', async ({ page }) => {
  const aiArgs = { page, test };
  
  // Use natural language commands
  await ai('Click on the Sign In button', aiArgs);
  await ai('Enter "user@example.com" in the email field', aiArgs);
  await ai('Click the Submit button', aiArgs);
});
```

## ⚙️ Configuration

### Environment Files

Each environment file (`.env.*`) contains marketplace-specific configuration:

```env
ENV="US"
BASE_URL="https://www.amazon.com"
CITY="ALASKA"
STATE="ALASKA"
COUNTRY="United States"
POSTAL_CODE="99546"
```

### Playwright Configuration

Key settings in `playwright.config.ts`:

- **Timeout**: 280 seconds (configurable for long-running operations)
- **Parallel Execution**: Enabled by default
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: Captured on failure
- **Videos**: Recorded on failure
- **Slow Motion**: 200ms delay between actions for better visibility

## 🚀 Running Tests

### Basic Test Execution

```bash
# Run all tests (default: US environment)
npm test

# Run tests for specific environment
npm run test:us
npm run test:uk
npm run test:au
npm run test:in
npm run test:de
```

### Headed Mode (See Browser)

```bash
# Run tests in headed mode
npm run test:headed:us
npm run test:headed:uk
npm run test:headed:in
```

### Debug Mode

```bash
# Run tests in debug mode with Playwright Inspector
npm run test:debug:us
npm run test:debug:uk
npm run test:debug:in
```

### Run Specific Test

```bash
# Run specific test file
cross-env ENV=us npx playwright test tests/createAccount.spec.ts

# Run specific test by name
cross-env ENV=us npx playwright test -g "Create Account"
```

### View Test Report

```bash
npm run report
```

## 📜 Available Scripts

### Test Execution Scripts

| Script | Description |
|--------|-------------|
| `npm test` | Run all tests (default environment) |
| `npm run test:us` | Run tests for US marketplace |
| `npm run test:uk` | Run tests for UK marketplace |
| `npm run test:au` | Run tests for Australia marketplace |
| `npm run test:in` | Run tests for India marketplace |
| `npm run test:de` | Run tests for Germany marketplace |
| `npm run test:frfr` | Run tests for France marketplace |
| `npm run test:frca` | Run tests for French Canada marketplace |
| `npm run test:jp` | Run tests for Japan marketplace |
| `npm run test:cn` | Run tests for China marketplace |
| `npm run test:it` | Run tests for Italy marketplace |
| `npm run test:nl` | Run tests for Netherlands marketplace |
| `npm run test:esmx` | Run tests for Mexico marketplace |
| `npm run test:ptbr` | Run tests for Brazil marketplace |
| `npm run test:ru` | Run tests for Russia marketplace |
| `npm run test:esar` | Run tests for Argentina (Spanish) marketplace |
| `npm run test:eses` | Run tests for Spain marketplace |

### Headed Mode Scripts

```bash
npm run test:headed:us      # US marketplace
npm run test:headed:uk      # UK marketplace
npm run test:headed:in      # India marketplace
# ... (similar pattern for all environments)
```

### Debug Mode Scripts

```bash
npm run test:debug:us       # US marketplace
npm run test:debug:uk       # UK marketplace
npm run test:debug:in       # India marketplace
# ... (similar pattern for all environments)
```

### Code Generation Scripts

```bash
npm run codegen:us          # Generate test code for US marketplace
npm run codegen:uk          # Generate test code for UK marketplace
npm run codegen:in          # Generate test code for India marketplace
# ... (similar pattern for all environments)
```

## 🌍 Environment Variables

### Per-Environment Configuration

Each marketplace has its own `.env` file with the following variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `ENV` | Environment identifier | `"US"` |
| `BASE_URL` | Amazon marketplace URL | `"https://www.amazon.com"` |
| `CITY` | Default city for address | `"ALASKA"` |
| `STATE` | Default state/region | `"ALASKA"` |
| `COUNTRY` | Country name | `"United States"` |
| `POSTAL_CODE` | Default postal code | `"99546"` |

### Adding a New Environment

1. Create a new `.env` file in the `env/` directory:
   ```bash
   touch env/.env.newmarket
   ```

2. Add configuration:
   ```env
   ENV="NEWMARKET"
   BASE_URL="https://www.amazon.newmarket"
   CITY="Default City"
   STATE="Default State"
   COUNTRY="Country Name"
   POSTAL_CODE="12345"
   ```

3. Add npm scripts in `package.json`:
   ```json
   {
     "scripts": {
       "test:newmarket": "cross-env ENV=newmarket playwright test",
       "test:headed:newmarket": "cross-env ENV=newmarket playwright test --headed",
       "test:debug:newmarket": "cross-env ENV=newmarket playwright test --debug"
     }
   }
   ```

## 🧪 Test Scenarios

### 1. Create Account (Traditional Playwright)

Creates a new Amazon account with complete profile setup:
- Sign in navigation
- Account creation with email and password
- OTP verification (manual entry)
- Address configuration
- Payment card addition

```bash
npm run test:us -- -g "Create Account"
```

### 2. Create Account with ZeroStep AI

Same as above but uses natural language commands for element interaction:

```bash
npm run test:us -- -g "Create Account with Zero Step AI"
```

### 3. Sign In with ZeroStep AI

Tests existing account sign-in flow using AI:

```bash
npm run test:us -- -g "Sign In with Zero Step AI"
```

## 📦 Page Object Model

### HomePage (`pages/homePage.ts`)

Handles main navigation and initial page interactions:
- Navigate to marketplace
- Handle popups and cookie banners
- Change language settings
- Navigate to sign-in
- Navigate to content library

### LoginPage (`pages/loginPage.ts`)

Manages authentication flow:
- Account creation
- OTP verification with polling
- Sign-in functionality

### ContentLibraryPage (`pages/contentLibraryPage.ts`)

Manages content library navigation:
- Navigate between tabs
- Access preferences

### PreferencesPage (`pages/preferencesPage.ts`)

Handles account preferences:
- Set/update address
- Add payment cards
- Manage country/region settings

## 🛠️ Troubleshooting

### Common Issues

**1. Tests fail with timeout errors**
```bash
# Increase timeout in playwright.config.ts
timeout: 480000  // 8 minutes
```

**2. ZeroStep commands not working**
- Verify your API token is correct in `zerostep.config.json`
- Check your ZeroStep account has available credits
- Ensure you have internet connectivity

**3. OTP verification timeout**
```typescript
// Increase OTP wait time in loginPage.ts
timeout: 300000  // 5 minutes
```

**4. Element not found errors**
- Check if the marketplace UI has changed
- Update selectors in respective Page Object files
- Use Playwright Inspector: `npm run test:debug:us`

**5. Environment not loading**
```bash
# Verify env file exists
ls env/.env.us

# Check environment variable
echo $ENV
```

### Debug Tips

1. **Use Playwright Inspector**
   ```bash
   npm run test:debug:us
   ```

2. **Enable verbose logging**
   ```bash
   DEBUG=pw:api npm run test:us
   ```

3. **Take screenshots manually**
   ```typescript
   await page.screenshot({ path: 'debug.png', fullPage: true });
   ```

4. **Use slow motion**
   ```typescript
   // In playwright.config.ts
   launchOptions: {
     slowMo: 500  // Increase for slower execution
   }
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author
Mohammed Lukmanudin M - [GitHub Profile](https://github.com/redJavaMan)

---

**Happy Testing! 🚀**
