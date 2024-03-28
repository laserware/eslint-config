module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  plugins: ["@typescript-eslint", "import", "unicorn"],
  env: {
    es6: true,
    node: true,
  },
  settings: {
    /**
     * Enables using with TypeScript "baseUrl" and "paths" option.
     * @see https://github.com/benmosher/eslint-plugin-import/issues/1485#issuecomment-535351922
     */
    "import/resolver": {
      typescript: {},
    },
  },
  ignorePatterns: ["node_modules"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  rules: {
    // Ensure you're using `string[]`, not `Array<string>`.
    // See https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/array-type.md
    "@typescript-eslint/array-type": [
      "error",
      {
        default: "array",
      },
    ],
    // Sometimes it's nice to tell TypeScript to put a sock in it:
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    "@typescript-eslint/member-ordering": "off",
    // This will probably need some tweaking, but it passes for now.
    // See https://typescript-eslint.io/rules/naming-convention/
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "default",
        format: ["camelCase", "PascalCase"],
        leadingUnderscore: "forbid",
        trailingUnderscore: "forbid",
        // Don't throw an error for "Some-Property" properties (required for request headers):
        filter: {
          regex: "[A-z]|-.*",
          match: false,
        },
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
      },
      {
        selector: "class",
        format: ["PascalCase"],
      },
      {
        selector: "enum",
        format: ["PascalCase"],
      },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
    ],
    // This is handled by TypeScript:
    "@typescript-eslint/no-explicit-any": "off",
    /*
     * This rule would complain if you had a class with:
     *  `public isSomething: boolean = false`
     * The type is inferred as a boolean since you set the value to `false`.
     * However, it's still valuable for
     */
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        // Allows us to use the rest operator to omit values from an object,
        // e.g. const { iDontWantThis, ...iWantThese } = someValue;
        //              ^^^^^^^^^^^^^ This _would_ throw a lint error if true.
        ignoreRestSiblings: true,
        // We're using `ignore` instead of `_` to prevent conflicts with the
        // "@typescript-eslint/naming-convention" rule:
        argsIgnorePattern: "ignore",
        varsIgnorePattern: "ignore",
      },
    ],
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: false,
        classes: false,
        variables: true,
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
    "no-await-in-loop": "off",
    "no-continue": "off",
    curly: ["error", "all"],
    eqeqeq: "error",
    "max-params": ["error", 3],
    yoda: ["error", "never"],
    "import/no-default-export": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling"],
          "object",
        ],
        "newlines-between": "always-and-inside-groups",
        distinctGroup: false,
        pathGroupsExcludedImportTypes: ["builtin"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    // Enforces `err` as the variable name in a catch statement.
    // Wrong: try { ... } catch (e) { ... }
    // Right: try { ... } catch (err) { ... }
    "unicorn/catch-error-name": [
      "error",
      {
        name: "err",
      },
    ],
    /*
     * Instead of `if (someArray.length)`, requires that you use `if (someArray.length === 0)`.
     * We should stay away from falsy checks if we can.
     * @see https://eslint.org/docs/rules/explicit-length-check.md
     */
    "unicorn/explicit-length-check": [
      "error",
      {
        "non-zero": "not-equal",
      },
    ],
    "unicorn/filename-case": [
      "error",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
        ignore: [/\.d\.ts/],
      },
    ],
    "unicorn/new-for-builtins": "error",
    "unicorn/no-new-buffer": "error",
    "unicorn/prefer-add-event-listener": "error",
    "unicorn/prefer-query-selector": "error",
    "unicorn/throw-new-error": "error",
    indent: "off",
    "@typescript-eslint/indent": "off",
  },
  overrides: [
    // Most config files live in the root and need to use a default export to work.
    // Rather than explicitly adding an `eslint-disable` comment, we just disable
    // the rule globally:
    {
      files: ["./*.cts", "./*.ts", "./*.mts"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["*.cjs", "*.js", "*.mjs"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-var-requires": "off",
        "import/no-default-export": "off",
        "no-console": "off",
      },
    },
    {
      files: "*.test.*",
      plugins: ["vitest"],
      extends: ["plugin:vitest/recommended"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            paths: [
              {
                name: "vitest",
                message: `Please do not import Vitest functions directly, they are available in the global scope`,
              },
            ],
          },
        ],
        // We want to be able to ignore type errors because we may be testing
        // conditions that require us to specify incorrect types:
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        // This just adds a lot of extra warnings/noise to the lint output:
        "@typescript-eslint/strict-boolean-expressions": "off",
        "no-lone-blocks": "off",
        /* Vitest Rule Errors */
        "vitest/consistent-test-filename": [
          "error",
          { pattern: ".*\\.test\\.[tj]sx?$" },
        ],
        "vitest/consistent-test-it": ["error", { fn: "it" }],
        "vitest/expect-expect": [
          "error",
          // If you add a custom assertion, you need to make sure it starts with
          // `expect`. See `~/test/customExpect.ts` for examples:
          { assertFunctionNames: ["expect*"] },
        ],
        "vitest/no-alias-methods": "error",
        "vitest/no-done-callback": "error",
        "vitest/no-mocks-import": "error",
        "vitest/no-standalone-expect": "error",
        "vitest/no-test-return-statement": "error",
        "vitest/prefer-comparison-matcher": "error",
        "vitest/prefer-each": "error",
        "vitest/prefer-equality-matcher": "error",
        "vitest/prefer-hooks-in-order": "error",
        "vitest/prefer-hooks-on-top": "error",
        "vitest/prefer-lowercase-title": "error",
        // If you're nesting describe blocks more than 3 levels deep, you probably
        // need to tweak your tests or split them up.
        "vitest/max-nested-describe": ["error", { max: 3 }],
        "vitest/require-top-level-describe": [
          "error",
          { maxNumberOfTopLevelDescribes: 1 },
        ],

        /* Vitest Rule Warnings */
        // Use `toEqual` for objects/arrays and `toBe` for primitives:
        "vitest/prefer-to-be": "warn",
        // Instead of `expect(someArray.length).toBe(5)`,
        // use `expect(someArray).toHaveLength(5):
        "vitest/prefer-to-have-length": "warn",
        // Instead of `expect(a.includes(b)).toBe(true);`,
        // use `expect(a).toContain(b);`:
        "vitest/prefer-to-contain": "warn",
        "vitest/prefer-todo": "warn",
        "vitest/prefer-mock-promise-shorthand": "warn",
        // Any setup or teardown code (even for things like initializing local
        // variables) should be done in a before* or after* hook:
        "vitest/require-hook": "warn",
      },
    },
  ],
};
