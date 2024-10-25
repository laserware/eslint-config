/**
 * Rules from typescript-eslint plugin.
 * @see https://typescript-eslint.io/rules/
 */
export const typescriptLintRules = {
  // Enforce using T[] for arrays instead of Array<T>.
  // https://typescript-eslint.io/rules/array-type
  "@typescript-eslint/array-type": ["error", { default: "array" }],

  // Sometimes you need to tell TS to put a sock in it.
  // https://typescript-eslint.io/rules/ban-ts-comment
  "@typescript-eslint/ban-ts-comment": "off",

  // Explicitly specifying a return type speeds up type checking.
  // https://typescript-eslint.io/rules/explicit-function-return-type
  "@typescript-eslint/explicit-function-return-type": [
    "warn",
    {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
    },
  ],

  // Enforce naming conventions for the stuff that matters.
  // https://typescript-eslint.io/rules/naming-convention
  "@typescript-eslint/naming-convention": [
    "error",
    {
      selector: "default",
      format: ["camelCase", "PascalCase"],
      leadingUnderscore: "forbid",
      trailingUnderscore: "forbid",
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

  // Sometimes you need to cast things to any because you know
  // what you're doing.
  // https://typescript-eslint.io/rules/no-explicit-any
  "@typescript-eslint/no-explicit-any": "off",

  // Infer the types for obvious stuff, but still allow explicit
  // annotations for params and class properties.
  // https://typescript-eslint.io/rules/no-inferrable-types
  "@typescript-eslint/no-inferrable-types": [
    "error",
    { ignoreParameters: true, ignoreProperties: true },
  ],

  // Namespaces are handy, I want to be able to use them.
  // https://typescript-eslint.io/rules/no-namespace
  "@typescript-eslint/no-namespace": "off",

  // Sometimes I know something is absolutely, positively not null.
  // https://typescript-eslint.io/rules/no-non-null-assertion
  "@typescript-eslint/no-non-null-assertion": "off",

  // Prefer the newer ES6-style imports over require().
  // We still need to be able to require Electron though.
  // https://typescript-eslint.io/rules/no-require-imports
  "@typescript-eslint/no-require-imports": ["error", { allow: ["electron"] }],

  // https://typescript-eslint.io/rules/no-unused-vars
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
      argsIgnorePattern: "[Ii]gnore",
      varsIgnorePattern: "[Ii]gnore",
    },
  ],

  // Function definitions are hoisted, so it's fine to use them
  // before they're defined.
  // https://typescript-eslint.io/rules/no-use-before-define
  "@typescript-eslint/no-use-before-define": [
    "error",
    {
      functions: false,
      classes: true,
      variables: true,
    },
  ],

  // Forbids usage of non-boolean types in expressions where a boolean
  // is expected. boolean and never types are always allowed.
  // https://typescript-eslint.io/rules/strict-boolean-expressions
  "@typescript-eslint/strict-boolean-expressions": [
    "error",
    {
      allowAny: true,
      allowNullableBoolean: true,
      allowNullableEnum: false,
      allowNullableNumber: false,
      allowNullableObject: false,
      allowNullableString: false,
      allowNumber: true,
      allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing: false,
      allowString: false,
    },
  ],
};
