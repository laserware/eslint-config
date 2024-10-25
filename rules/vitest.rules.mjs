import vitestPlugin from "eslint-plugin-vitest";

/**
 * Rules for the `eslint-plugin-vitest` plugin.
 * @see https://github.com/vitest-dev/eslint-plugin-vitest
 */
export const vitestLintRules = {
  ...vitestPlugin.configs.recommended.rules,

  /* Overrides from other plugins */
  "no-lone-blocks": "off",
  "no-restricted-imports": [
    "error",
    // prettier-ignore
    {
      paths: [
        { name: "vitest", message: "Please do not import Vitest functions directly, they are available in the global scope" },
      ],
    },
  ],
  "@typescript-eslint/strict-boolean-expressions": "off",

  /* Vitest Rules */
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-filename.md
  "vitest/consistent-test-filename": ["error", { pattern: ".*\\.test\\.[tj]sx?$" }],

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/consistent-test-it.md
  "vitest/consistent-test-it": ["error", { fn: "it" }],

  // Enforce having at least one expectation in test body to ensure that the
  // test is actually testing something.
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/expect-expect.md
  "vitest/expect-expect": ["error", { assertFunctionNames: ["expect*"] }],

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/max-nested-describe.md
  "vitest/max-nested-describe": ["error", { max: 3 }],

  // Disallows alias methods and forces the use of the original method.
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-alias-methods.md
  "vitest/no-alias-methods": "error",

  // Prevent the use of a callback in asynchronous tests and hooks.
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-done-callback.md
  "vitest/no-done-callback": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-duplicate-hooks.md
  "vitest/no-duplicate-hooks": "error",

  // Prevent importing from the `__mocks__` directory.
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-mocks-import.md
  "vitest/no-mocks-import": "error",

  // Only use `expect` inside of `describe` blocks.
  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-standalone-expect.md
  "vitest/no-standalone-expect": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/no-test-return-statement.md
  "vitest/no-test-return-statement": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-comparison-matcher.md
  "vitest/prefer-comparison-matcher": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-each.md
  "vitest/prefer-each": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-equality-matcher.md
  "vitest/prefer-equality-matcher": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-in-order.md
  "vitest/prefer-hooks-in-order": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-hooks-on-top.md
  "vitest/prefer-hooks-on-top": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-lowercase-title.md
  "vitest/prefer-lowercase-title": "error",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-mock-promise-shorthand.md
  "vitest/prefer-mock-promise-shorthand": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be.md
  "vitest/prefer-to-be": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-falsy.md
  "vitest/prefer-to-be-falsy": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-be-truthy.md
  "vitest/prefer-to-be-truthy": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-contain.md
  "vitest/prefer-to-contain": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-to-have-length.md
  "vitest/prefer-to-have-length": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-todo.md
  "vitest/prefer-todo": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-hook.md
  "vitest/require-hook": "warn",

  // https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/require-top-level-describe.md
  "vitest/require-top-level-describe": ["error", { maxNumberOfTopLevelDescribes: 1 }],
};
