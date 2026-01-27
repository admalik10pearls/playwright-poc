# Playwright POC

Playwright tests on a dummy website for practice and demonstration purposes.

## Project Overview

This project is a proof-of-concept implementation of end-to-end testing using Playwright. It automates testing against a dummy website to validate UI functionality and user workflows.

## Tech Stack

- **Playwright** - End-to-end testing framework
- **TypeScript** - Programming language for type-safe test scripts
- **GitHub Actions** - CI/CD pipeline for automated testing
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **Commitizen** - Conventional commit messages
- **CommitLint** - Commit message validation

## Features

- Automated end-to-end tests using Playwright
- TypeScript for enhanced code quality and type safety
- Continuous Integration with GitHub Actions for automated test execution
- Tests run against a dummy website environment
- ESLint and Prettier for consistent code style
- Git hooks for enforcing code quality standards
- Conventional commit messages with commitizen and commit linting

## Getting Started

### Prerequisites

- Node.js v20 (see [.nvmrc](.nvmrc) for version lock)
- Yarn

### Installation

```bash
yarn install
```

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in headed mode (see browser)
yarn test:headed

# Run tests in debug mode
yarn test:debug
```

### Code Quality

```bash
# Lint code
yarn lint

# Fix linting issues
yarn lint:fix

# Format code
yarn format

# Check formatting
yarn format:check

# Type checking
yarn typecheck
```

### Commits

This project uses conventional commits via commitizen:

```bash
# Create a conventional commit
yarn commit
```

All commits are validated against the conventional commit format using CommitLint.

## CI/CD

This project uses GitHub Actions to automatically run Playwright tests on every push and pull request. Test results are available in the Actions tab of the repository.

## Project Structure

```
.
├── shared/                                      # Shared test utilities and page objects
│   ├── components/                              # Reusable UI components
│   │   ├── cart.component.ts                    # Cart functionality component
│   │   ├── products.component.ts                # Products functionality component
│   │   └── index.ts                             # Component exports
│   ├── constants/                               # Application constants
│   │   ├── routes.ts                            # Route URLs
│   │   └── strings.ts                           # String constants
│   ├── pages/                                   # Page Object Models
│   │   ├── cart.page.ts                         # Cart page object
│   │   ├── inventory.page.ts                    # Inventory/PLP page object
│   │   └── login.page.ts                        # Login page object
│   └── utilities/                               # Utility functions
│       └── utilities.ts                         # Helper utilities
├── tests/                                       # Test specifications
│   ├── inventory.spec.ts                        # Inventory functionality tests
│   └── login.spec.ts                            # Login functionality tests
├── playwright.config.ts                         # Playwright configuration
├── global-setup.ts                              # Global setup file for tests
├── package.json                                 # Project dependencies and scripts
├── tsconfig.json                                # TypeScript configuration
├── eslint.config.js                             # ESLint configuration
├── commitlint.config.cjs                        # CommitLint configuration
├── .nvmrc                                       # Node.js version lock file
├── playwright-report/                           # Test results and reports
├── test-results/                                # Detailed test results
├── auth.json                                    # Authentication credentials
└── README.md                                    # This file
```

## Architecture

This project follows the **Page Object Model (POM)** pattern with a **component-based approach**:

### Components (`shared/components/`)

Reusable UI components that encapsulate specific functionality:

- **ProductsComponent** - Handles product interactions (listing, adding to cart, pricing)
- **CartComponent** - Manages cart operations (viewing count, opening cart)

### Page Objects (`shared/pages/`)

Page classes compose components to represent full pages:

- **InventoryPage** - Product listing/PLP combining ProductsComponent and CartComponent
- **CartPage** - Shopping cart page with component composition
- **LoginPage** - Authentication page

This component-based approach eliminates duplication and promotes reusability across multiple pages.

## Development Workflow

1. **Make changes** to test files or code
2. **Lint and format** code with `yarn lint:fix` and `yarn format`
3. **Type check** with `yarn typecheck`
4. **Run tests** with `yarn test` or `yarn test:headed` for debugging
5. **Commit** changes using `yarn commit` for conventional commits
6. **Push** to GitHub, which triggers CI/CD tests via GitHub Actions

## Component and Page Object Pattern

### Creating Components

Components encapsulate specific UI functionality. For example, `ProductsComponent`:

```typescript
// shared/components/products.component.ts
export class ProductsComponent {
  constructor(private page: Page) {
    this.products = page.locator('[data-test="inventory-item"]');
  }

  async getProductCount() {
    return await this.products.count();
  }
}
```

### Using Components in Page Objects

Page objects compose multiple components:

```typescript
// shared/pages/inventory.page.ts
export class InventoryPage {
  products: ProductsComponent;
  cart: CartComponent;

  constructor(private page: Page) {
    this.products = new ProductsComponent(page);
    this.cart = new CartComponent(page);
  }

  async addProductToCart(index: number) {
    await this.products.addProductToCartByIndex(index);
  }
}
```

### Using Page Objects in Tests

Tests use page objects for clean, maintainable test code:

```typescript
// tests/inventory.spec.ts
test('verify user can add products to cart', async ({ page }) => {
  const inventory = new InventoryPage(page);
  await inventory.addProductToCart(0);
  const cartCount = await inventory.getCartCount();
  expect(cartCount).toBe('1');
});
```

## Best Practices

- **Components** - Focus on a single UI feature (Products, Cart, Navigation, etc.)
- **Page Objects** - Compose multiple components to represent a full page
- **No Assertions in Page Objects** - Keep assertions in test files only
- **Locators as Private** - Keep locator definitions internal to components/pages
- **Descriptive Method Names** - Use clear method names that describe user actions
