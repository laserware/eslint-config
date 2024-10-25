import eslint from "@eslint/js";

/**
 * Rules from ESLint core.
 */
export const coreLintRules = {
  ...eslint.configs.recommended.rules,

  // Just use braces for all `if` statements, even one-liners. Every
  // single `if` statement in the code base will have braces.
  // https://eslint.org/docs/latest/rules/curly
  curly: ["error", "all"],

  // Use === instead of ==.
  // https://eslint.org/docs/latest/rules/eqeqeq
  eqeqeq: "error",

  // Once you hit 3 params for a function, make it an object.
  // https://eslint.org/docs/latest/rules/max-params
  "max-params": ["error", 3],

  // Only allow logging debug and error to the console.
  // https://eslint.org/docs/latest/rules/no-console
  "no-console": ["error", { allow: ["debug", "error"] }],

  // Need to disable this to allow for defining multiple signatures.
  // https://eslint.org/docs/latest/rules/no-redeclare
  "no-redeclare": "off",

  // Disallow specified names in exports.
  // https://eslint.org/docs/latest/rules/no-restricted-exports
  "no-restricted-exports": [
    "error",
    {
      restrictDefaultExports: {
        // Restricts export { default } from 'foo'; declarations:
        defaultFrom: true,
        // Restricts export default declarations:
        direct: true,
        // Restricts export { foo as default }; declarations:
        named: true,
        // Restricts export { foo as default } from 'foo'; declarations:
        namedFrom: true,
        // Restricts export * as default from 'foo'; declarations:
        namespaceFrom: true,
      },
    },
  ],

  // TypeScript handles undefined checks. Enabling this rule
  // causes issues with ambient declarations.
  // https://eslint.org/docs/latest/rules/no-undef
  "no-undef": "off",

  // This is handled by TypeScript:
  // https://eslint.org/docs/latest/rules/no-unused-vars
  "no-unused-vars": "off",

  // Disabling this because it's handled by the TypeScript plugin:
  "no-use-before-define": "off",

  // Throws an error if you use `if ("red" === color)` instead of
  // `if (color === "red")`.
  // See https://eslint.org/docs/rules/yoda
  yoda: ["error", "never"],
};
