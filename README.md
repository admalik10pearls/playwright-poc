# Playwright POC

Playwright tests on a dummy website for practice and demonstration purposes.

## Project Overview

This project is a proof-of-concept implementation of end-to-end testing using Playwright. It automates testing against a dummy website to validate UI functionality and user workflows.

## Tech Stack

- **Playwright** - End-to-end testing framework
- **TypeScript** - Programming language for type-safe test scripts
- **GitHub Actions** - CI/CD pipeline for automated testing
- **ESLint** - Code linting with TypeScript support
  - `eslint-plugin-complexity` - Code complexity analysis
  - `eslint-plugin-unused-imports` - Dead code detection
  - `eslint-plugin-playwright` - Playwright-specific rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit and pre-push checks
- **Commitizen** - Conventional commit messages
- **CommitLint** - Commit message validation

## Features

- Automated end-to-end tests using Playwright
- TypeScript for enhanced code quality and type safety
- Continuous Integration with GitHub Actions for automated test execution
- Tests run against a dummy website environment
- ESLint and Prettier for consistent code style
- Git hooks for enforcing code quality standards on every commit and push
- Conventional commit messages with commitizen and commit linting
- Comprehensive quality gateways for production-ready code (see [Quality Gateways](#quality-gateways) section below)

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
# Lint code (includes complexity analysis & dead code detection)
yarn lint

# Fix linting issues (auto-fixes unused imports)
yarn lint:fix

# Check code complexity
yarn complexity

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
│   ├── api/                                     # API utilities and clients
│   │   ├── apiContext.ts                        # API request context factory
│   │   ├── clients/                             # API client implementations
│   │   │   └── petstore.client.ts               # Petstore API client
│   │   └── models/                              # API response models/types
│   │       └── pet.model.ts                     # Pet model type definition
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
│   ├── api/                                     # API tests
│   │   └── pet.spec.ts                          # Petstore API tests
│   ├── inventory.spec.ts                        # Inventory functionality tests
│   └── login.spec.ts                            # Login functionality tests
├── playwright.config.ts                         # Playwright configuration
├── global-setup.ts                              # Global setup for auth/login
├── package.json                                 # Project dependencies and scripts
├── tsconfig.json                                # TypeScript configuration
├── eslint.config.js                             # ESLint configuration
├── commitlint.config.cjs                        # CommitLint configuration
├── .nvmrc                                       # Node.js version lock file
├── auth.json                                    # Authentication credentials (generated)
├── playwright-report/                           # Test results and reports (generated)
├── test-results/                                # Detailed test results (generated)
└── README.md                                    # This file
```

## Architecture

This project follows the **Page Object Model (POM)** pattern with a **component-based approach** for UI tests, and maintains an **API client pattern** for API tests.

### Components (`shared/components/`)

Reusable UI components that encapsulate specific functionality:

- **ProductsComponent** - Handles product interactions (listing, adding to cart, pricing)
- **CartComponent** - Manages cart operations (viewing count, opening cart)

### Page Objects (`shared/pages/`)

Page classes compose components to represent full pages:

- **InventoryPage** - Product listing/PLP combining ProductsComponent and CartComponent
- **CartPage** - Shopping cart page with component composition
- **LoginPage** - Authentication page

This component-based approach eliminates duplication and promotes reusability across UI tests.

### API Layer (`shared/api/`)

API utilities for backend testing:

- **apiContext.ts** - Factory function to create configured API request contexts
- **PetstoreClient** - Typed client for Petstore API interactions
- **Pet** - TypeScript model for API responses

Tests can run against both UI (Playwright browser) and API projects independently.

## Quality Gateways

This project implements **six automated quality gateways** to ensure code reliability, security, and maintainability. Quality gates are enforced at pre-commit and pre-push stages.

### All Quality Gateways

#### Pre-Commit Gateways (Automatic on `git commit`)

1. **💀 Dead Code Detection** - Automatically removes unused imports and variables
   - Error on unused imports (blocks commit)
   - Warning on unused variables (non-blocking)
   - Auto-fixable via `yarn lint:fix`

2. **📊 Code Complexity Analysis** - Prevents overly complex functions
   - Max complexity: 10 (general code), 8 (tests), 20 (config)
   - Helps maintain readable and testable code
   - Detected during linting

3. **🧪 Test Naming & Structure Validation** - Enforces test best practices
   - Test names must start with lowercase
   - Requires describe blocks for organization
   - Prevents direct page method calls (must use page objects)
   - Maximum test complexity: 8

4. **🧱 Architectural Boundaries** - Prevent cross-layer violations, accidental dependencies, and circular imports.
   - Folders and files are categorized as **layers**:
     - `tests/` → Playwright test files
     - `shared/pages/` → Page objects (UI representation)
     - `shared/components/` → Reusable UI components
     - `shared/assertions/` → Assertion helpers
     - `shared/utilities/` → Pure helper functions
     - `shared/api/` → API clients for test data
     - `shared/constants/` → Constant values (routes, strings, etc.)

   - **Rules enforced by ESLint**:
     - `tests` can import pages, components, assertions, utilities, API clients, constants
     - `pages` can import components, utilities, constants
     - `components` can import utilities, constants
     - `assertions` can import utilities, constants
     - `utilities` can import constants only
     - `api` can import utilities and constants
     - `constants` cannot import anything

5. **⚡ Async Correctness & Promise Safety** - Reduce flakiness, avoid race conditions, and ensure proper async usage.
   - Enforced with `@typescript-eslint` rules:
     - `await-thenable` → ensures `await` is only used on promises
     - `no-misused-promises` → prevents async misuse in hooks, callbacks, and loops
     - `require-await` → warns if a function is marked async but doesn’t use await

6. **🎯 Deterministic Test Enforcement** - Make all tests reproducible, deterministic, and maintainable.
   - Enforced via `eslint-plugin-playwright` and custom rules:
     - `no-wait-for-timeout` → prevents arbitrary `page.waitForTimeout()`
     - `expect-expect` → ensures each test actually asserts something
     - `no-focused-test` / `no-skipped-test` → prevents `.only` or skipped tests
     - Restricted usage of `Math.random()` and `Date.now()` in tests
     - Tests must be grouped under `describe()` blocks and have lowercase titles
     - Page objects must be used for UI interactions; raw `page.locator`, `click`, `fill` in tests are banned

7. **📄 Documentation Coverage** - Improves readability, helps new team members, and supports IDE tooltips
   - All functions, classes, and types must include JSDoc comments
   - `@returns` and `@param` must be documented for clarity

8. **📦 Import Organization** - Consistent import order, readability, and reduced merge conflicts
   - Imports are automatically sorted by:
     - Node built-ins
     - External modules
     - Internal modules (`shared/...`)
     - Relative imports

9. **🔍 Code Duplication Detection** - Reduce maintenance cost and prevent subtle bugs
   - `eslint-plugin-sonarjs` is used to identify duplicated or very similar code blocks

#### Pre-Push Gateways (Automatic on `git push`)

10. **🔐 Formatting Check** - Ensures code follows Prettier rules

- Blocks push if formatting issues found
- Auto-fixable via `yarn format`

11. **📐 Type Safety Check** - Validates TypeScript types

- Ensures all code passes strict TypeScript checking
- Blocks push if type errors found

12. **✅ Full Test Suite Execution** - Runs all Playwright tests

- Blocks push if any tests fail
- Ensures no regressions before code reaches remote

### Quality Metrics

| Metric                         | Threshold                                        | Status                         |
| ------------------------------ | ------------------------------------------------ | ------------------------------ |
| Complexity (general)           | Max 10                                           | Error if exceeded              |
| Complexity (tests)             | Max 8                                            | Error if exceeded              |
| Complexity (config)            | Max 20                                           | Warning if exceeded            |
| Unused Imports                 | 0                                                | Auto-fixed on commit           |
| Unused Variables               | 0 (\_-prefixed ignored)                          | Warning on commit              |
| Test Naming & Structure        | Lowercase titles, require describe blocks        | Enforced on commit             |
| Deterministic Test Practices   | No Math.random() / Date.now(), no raw page calls | Enforced on commit             |
| Architectural Boundaries       | Layered import restrictions                      | Enforced on commit             |
| Async Correctness              | No misused promises, await only on Promises      | Enforced on commit             |
| Documentation Coverage (JSDoc) | All functions/classes/types documented           | Warning / Error on commit      |
| Import Organization            | Sorted: Node → external → internal → relative    | Error / auto-fixable on commit |
| Code Duplication Detection     | No duplicate or very similar code blocks         | Enforced on commit             |
| Type Coverage                  | Strict mode                                      | Validated on push              |
| Test Structure                 | Compliant                                        | Enforced on commit             |
| Code Formatting                | Prettier compliant                               | Enforced on push               |

### Quality Gate Workflow

```
git commit
    ↓
[PRE-COMMIT CHECKS]
├─ 💀 Dead Code Detection (unused imports & variables)
├─ 📊 Code Complexity Analysis (general: 10, tests: 8)
├─ 🧪 Test Naming & Structure Validation
├─ 🧱 Architectural Boundaries
├─ ⚡ Async Correctness & Promise Safety
├─ 🎯 Deterministic Test Enforcement
├─ 📄 Documentation Coverage (JSDoc)
├─ 📦 Import Organization
└─ 🔍 Code Duplication Detection
    ↓
✅ Commit successful (auto-fixable items fixed automatically)

git push
    ↓
[PRE-PUSH CHECKS]
├─ 🔐 Formatting Check (Prettier)
├─ 📐 Type Safety Check (strict TypeScript)
├─ 📊 Complexity Validation (config max 20, general max 10, tests max 8)
└─ 🧪 Full Test Suite Execution (Playwright tests)
    ↓
✅ Push allowed or ❌ Push blocked (fix issues and retry)

```

For detailed quality gateway documentation, see [THREE_GATEWAYS_IMPLEMENTATION.md](THREE_GATEWAYS_IMPLEMENTATION.md).

## Development Workflow

1. **Make changes** to test files or code
2. **Lint and format** code with `yarn lint:fix` and `yarn format`
3. **Type check** with `yarn typecheck`
4. **Run tests** with `yarn test` or `yarn test:headed` for debugging
5. **Commit** changes using `yarn commit` for conventional commits (pre-commit quality gates run automatically)
6. **Push** to GitHub (pre-push quality gates validate everything before allowing push)

See [Quality Gateways](#quality-gateways) section above for details on automatic checks.

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

- **🧱Components**
  - Focus on a single UI feature (Products, Cart, Navigation, etc.)
    - Keep methods small and simple to avoid high complexity (>8 in tests).
    - Import only allowed layers: utilities, constants, and other components if needed.
- **📄Page Objects**
  - Compose multiple components to represent a full page
    - Do not directly use raw page.locator, click, fill; delegate to components.
    - Can import components, utilities, constants only. No API or test imports.
- **✅ Assertions**
  - Keep assertions in test files only
    - Follow expect-expect rule: every test must assert at least once.
- **🔒 Locators**
  - Keep locator definitions internal to components/pages
    - Use getter methods to expose values like cart count or product info.
- **✍️ Method Names**
  - Use clear method names that describe user actions
    -Test method names should start lowercase.
- **⚡ Async & Promise Safety**
  - Reduce flakiness and race conditions
    - Always await async operations; avoid misusing Promise.
    - Do not use page.waitForTimeout(), Math.random(), or Date.now() in tests.
- **📄 Documentation (JSDoc)**
  - Maintain readability and IDE support
    - Document all functions, classes, and types with JSDoc.
    - Include @param and @returns tags for clarity.
- **📦 Import Organization**
  - Consistent and readable import order
    - Node built-ins → External modules → Internal modules (shared/...) → Relative imports.
- **🔍 Code Duplication**
  - Avoid repeating logic
    - Reuse components, utilities, and API clients wherever possible.
