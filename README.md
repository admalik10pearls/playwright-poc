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
├── tests/                    # Test files
├── playwright.config.ts      # Playwright configuration
├── package.json              # Project dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── eslint.config.js          # ESLint configuration
├── commitlint.config.cjs     # CommitLint configuration
├── .nvmrc                    # Node.js version lock file
├── playwright-report/        # Test results and reports
├── test-results/             # Detailed test results
└── README.md                 # This file
```

## Development Workflow

1. **Make changes** to test files or code
2. **Lint and format** code with `npm run lint:fix` and `npm run format`
3. **Type check** with `npm run typecheck`
4. **Run tests** with `npm test` or `npm run test:headed` for debugging
5. **Commit** changes using `npm run commit` for conventional commits
6. **Push** to GitHub, which triggers CI/CD tests via GitHub Actions
