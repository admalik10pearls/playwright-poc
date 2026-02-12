import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import playwright from 'eslint-plugin-playwright';
import complexity from 'eslint-plugin-complexity';
import unusedImports from 'eslint-plugin-unused-imports';
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-config-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import importPlugin from 'eslint-plugin-import';
import boundaries from 'eslint-plugin-boundaries';

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
      jsdoc,
      sonarjs,
      import: importPlugin,
      boundaries,
    },
    settings: {
      'boundaries/elements': [
        { type: 'tests', pattern: 'tests/**' },
        { type: 'pages', pattern: 'shared/pages/**' },
        { type: 'components', pattern: 'shared/components/**' },
        { type: 'assertions', pattern: 'shared/assertions/**' },
        { type: 'constants', pattern: 'shared/constants/**' },
        { type: 'utilities', pattern: 'shared/utilities/**' },
        { type: 'api', pattern: 'shared/api/**' },
      ],
    },
    rules: {
      /* 🧱 Architectural boundaries */
      'boundaries/element-types': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: 'tests',
              allow: ['pages', 'components', 'assertions', 'utilities', 'api', 'constants'],
            },
            {
              from: 'pages',
              allow: ['components', 'utilities', 'constants'],
            },
            {
              from: 'components',
              allow: ['utilities', 'constants'],
            },
            {
              from: 'assertions',
              allow: ['utilities', 'constants'],
            },
            {
              from: 'utilities',
              allow: ['constants'],
            },
            {
              from: 'api',
              allow: ['constants', 'utilities'],
            },
            {
              from: 'constants',
              allow: [],
            },
          ],
        },
      ],

      // Prevent weird cross-imports
      'boundaries/no-private': 'error',
      'boundaries/no-unknown': 'error',

      /* ---------- TypeScript ---------- */
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      /* ---------- Async correctness ---------- */
      '@typescript-eslint/await-thenable': 'error',

      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: {
            attributes: false,
            arguments: false,
          },
        },
      ],

      '@typescript-eslint/require-await': 'error',

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

      /* ---------- JSDoc ---------- */
      'jsdoc/require-jsdoc': [
        'warn',
        {
          require: {
            FunctionDeclaration: true,
            ClassDeclaration: true,
            MethodDefinition: false,
            ArrowFunctionExpression: false,
            FunctionExpression: false,
          },
          contexts: [
            'ExportNamedDeclaration > FunctionDeclaration',
            'ExportNamedDeclaration > ClassDeclaration',
          ],
        },
      ],

      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-types': 'warn',
      'jsdoc/require-param': 'warn',
      'jsdoc/require-returns': 'warn',

      /* ---------- SonarJS ---------- */
      'sonarjs/no-duplicate-string': ['warn', { threshold: 3 }],
      'sonarjs/cognitive-complexity': ['error', 12],
      'sonarjs/no-identical-functions': 'error',

      /* ---------- Import Plugin ---------- */
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': 'warn',
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
    },
  },

  /* ----------------------------------
   * 🚫 JSDOCS RULES FOR POM
   * ---------------------------------- */
  {
    files: ['shared/pages/**/*.ts', 'shared/components/**/*.ts'],
    rules: {
      'jsdoc/require-jsdoc': [
        'error',
        {
          require: {
            ClassDeclaration: true,
            MethodDefinition: true,
          },
        },
      ],
    },
  },

  /* ----------------------------------
   * 🚫 SONAR RULES FOR TESTS
   * ---------------------------------- */
  {
    files: ['tests/**/*.ts'],
    rules: {
      'sonarjs/no-identical-functions': 'off',
      'sonarjs/no-duplicate-string': 'off',
    },
  },

  /* ----------------------------------
   * 🔒 TEST FILE ENFORCEMENT
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
        // ✅ Enforce that tests include a metadata tag (either in the title or as a config property)
        {
          selector:
            "CallExpression[callee.name='test']:not(:has(Literal[value=/@smoke|@regression|@sanity|@bug/])), CallExpression[callee.name='test']:not(:has(Property[key.name='tag'] > Literal[value=/^@/]))",
          message:
            'Test must include a metadata tag. Either include it in the title string (e.g., "test @smoke") or in the test configuration object (e.g., { tag: "@smoke" }).',
        },
        // ⛔ No debug-only code in tests
        {
          selector: "CallExpression[callee.property.name='pause']",
          message: 'page.pause() is for local debugging only. Remove it before committing.',
        },
        {
          selector: "CallExpression[callee.property.name='debug']",
          message: 'debug() calls are for local development only.',
        },
        // ⛔ No hardcoded URLs in tests
        {
          selector: 'Literal[value=/^https?:\\/\\//]',
          message:
            'Do not hardcode URLs in tests. Use the "baseURL" from playwright.config.ts or import constants from "shared/constants".',
        },
      ],

      // 🔎 Enforce test grouping
      'playwright/require-top-level-describe': 'error',

      // 📝 Test naming and structure validation
      complexity: ['error', { max: 8 }], // Tests should be simpler

      // 💀 Dead code detection in tests
      'unused-imports/no-unused-imports': 'error',

      // Hooks & tests must return/await properly
      '@typescript-eslint/no-misused-promises': [
        'error',
        {
          checksVoidReturn: true,
        },
      ],
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

      // ⛔ Config files don't need JSDoc
      'jsdoc/require-jsdoc': 'off',
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
