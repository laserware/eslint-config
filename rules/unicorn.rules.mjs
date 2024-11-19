/**
 * Rules for `eslint-plugin-unicorn`.
 * @see https://github.com/sindresorhus/eslint-plugin-unicorn
 */
export const unicornLintRules = {
  // Use `err` for Error instances.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/catch-error-name.md
  "unicorn/catch-error-name": ["error", { name: "err" }],

  // Enforce explicitly comparing the length or size property of a value.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/explicit-length-check.md
  "unicorn/explicit-length-check": ["error", { "non-zero": "not-equal" }],

  // Enforce a case style for filenames.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md
  "unicorn/filename-case": [
    "error",
    { cases: { camelCase: true, pascalCase: true }, ignore: [{}] },
  ],

  // Enforce the use of new for all builtins, except String, Number, Boolean, Symbol
  // and BigInt.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/new-for-builtins.md
  "unicorn/new-for-builtins": "error",

  // Enforce the use of Buffer.from() and Buffer.alloc() instead of the
  // deprecated new Buffer().
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-new-buffer.md
  "unicorn/no-new-buffer": "error",

  // Using EventTarget in Node.js isn't quite there yet.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-add-event-listener.md
  "unicorn/prefer-add-event-listener": "off",

  // Node#appendChild() returns the value of the appended node, so I prefer to
  // continue using it.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-dom-node-append.md
  "unicorn/prefer-dom-node-append": "off",

  // Prefer KeyboardEvent#key over KeyboardEvent#keyCode.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-keyboard-event-key.md
  "unicorn/prefer-keyboard-event-key": "error",

  // Prefer `.querySelector()` over `.getElementById()`.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/prefer-query-selector.md
  "unicorn/prefer-query-selector": "error",

  // Require new when creating an error.
  // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/throw-new-error.md
  "unicorn/throw-new-error": "error",
};
