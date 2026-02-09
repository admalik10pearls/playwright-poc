import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import complexity from 'eslint-plugin-complexity';
import unusedImports from 'eslint-plugin-unused-imports';
import prettier from 'eslint-config-prettier';

export default [
  /* ----------------------------------
   * Global ignores
   * ---------------------------------- */
  {
    ignores: ['node_modules/**', 'dist/**', 'playwright-report/**', 'test-results/**', 'auth.json'],
  },

  /* ----------------------------------
   * Base TypeScript + Playwright rules
   * ---------------------------------- */
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      playwright,
      complexity,
      'unused-imports': unusedImports,
    },
    rules: {
      /* ---------- TypeScript ---------- */
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',

      /* ---------- Code Complexity Analysis ---------- */
      complexity: ['error', { max: 10 }],

      /* ---------- Dead Code Detection ---------- */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      /* ---------- Playwright ---------- */
      'playwright/no-focused-test': 'error',
      'playwright/no-skipped-test': 'warn',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/expect-expect': 'error',
    },
  },

  /* ----------------------------------
   * 🚫 TEST FILE ENFORCEMENT
   * ---------------------------------- */
  {
    files: ['tests/**/*.ts'],
    rules: {
      // ❌ No raw locators or direct clicks/fills in tests
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.object.name='page'][callee.property.name='locator']",
          message: 'Do not use page.locator() in tests. Use page objects or components.',
        },
        {
          selector: "CallExpression[callee.object.name='page'][callee.property.name='click']",
          message: 'Do not use page.click() in tests. Use semantic page/component methods.',
        },
        {
          selector: "CallExpression[callee.object.name='page'][callee.property.name='fill']",
          message: 'Do not use page.fill() in tests. Use semantic page/component methods.',
        },
        {
          // ✅ Enforce test names to start lowercase (optionally with @tags)
          selector: "CallExpression[callee.name='test'][arguments.0.value=/^[A-Z]/]",
          message:
            'Test titles must start with lowercase letters. Use descriptive names and optional @tags like @smoke, @no-auth.',
        },
      ],

      // 🔎 Enforce test grouping
      'playwright/require-top-level-describe': 'error',

      // 📝 Test naming and structure validation
      complexity: ['error', { max: 8 }], // Tests should be simpler

      // 💀 Dead code detection in tests
      'unused-imports/no-unused-imports': 'error',
    },
  },

  /* ----------------------------------
   * 🔒 PAGE / COMPONENT ENFORCEMENT
   * ---------------------------------- */
  {
    files: ['shared/pages/**/*.ts', 'shared/components/**/*.ts'],
    rules: {
      // Locators must be readonly
      '@typescript-eslint/prefer-readonly': ['error'],

      // Naming consistency for locators
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'property',
          modifiers: ['readonly'],
          format: ['camelCase'],
        },
      ],
    },
  },

  /* ----------------------------------
   * ⚙️ CONFIG FILES EXCEPTION
   * ---------------------------------- */
  {
    files: ['**/playwright.config.ts', '**/global-setup.ts', '**/*.config.ts'],
    rules: {
      // Config files can be more complex
      complexity: ['warn', { max: 20 }],
    },
  },

  /* ----------------------------------
   * 🧪 ASSERTION HELPERS
   * ---------------------------------- */
  {
    files: ['shared/assertions/**/*.ts'],
    rules: {
      // Assertions must actually assert
      'playwright/expect-expect': 'error',
    },
  },

  /* ----------------------------------
   * 🎨 Prettier (must be last)
   * ---------------------------------- */
  prettier,
];
