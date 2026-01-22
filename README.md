# Playwright POC

Playwright tests on a dummy website for practice and demonstration purposes.

## Project Overview

This project is a proof-of-concept implementation of end-to-end testing using Playwright. It automates testing against a dummy website to validate UI functionality and user workflows.

## Tech Stack

- **Playwright** - End-to-end testing framework
- **TypeScript** - Programming language for type-safe test scripts
- **GitHub Actions** - CI/CD pipeline for automated testing

## Features

- Automated end-to-end tests using Playwright
- TypeScript for enhanced code quality and type safety
- Continuous Integration with GitHub Actions for automated test execution
- Tests run against a dummy website environment

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

## CI/CD

This project uses GitHub Actions to automatically run Playwright tests on every push and pull request. Test results are available in the Actions tab of the repository.

## Project Structure

```
.
├── tests/          # Test files
├── playwright.config.ts  # Playwright configuration
├── package.json    # Project dependencies and scripts
└── README.md       # This file
```
