import importPlugin from "eslint-plugin-import";

/**
 * Rules for `eslint-plugin-import`.
 * @see https://github.com/import-js/eslint-plugin-import
 */
export const importLintRules = {
  ...importPlugin.flatConfigs.recommended.rules,
  ...importPlugin.flatConfigs.typescript.rules,

  // Ensure all imports include a file extension:
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/extensions.md
  "import/extensions": [
    "error",
    "never",
    {
      ignorePackages: true,
      pattern: {
        js: "always",
        json: "always",
        svelte: "always",
        ts: "always",
        mjs: "always",
        mts: "always",
      },
    },
  ],

  // Explicitly disabling this because it's handled by ESLint's
  // `no-restricted-exports` rule. Default exports are the devil.
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-default-export.md
  "import/no-default-export": "off",

  // We disable this in favor of `no-duplicate-imports` because this causes
  // issues with stuff like `svelte` and `svelte/store`.
  "import/no-duplicates": "off",

  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-useless-path-segments.md
  "import/no-useless-path-segments": "error",

  // Allow wildcard imports.
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-namespace.md
  "import/namespace": "off",

  // Enforce ordering for imports. This may differ for projects, but it's
  // a good starting point.
  // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md
  "import/order": [
    "error",
    {
      // prettier-ignore
      groups: [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "object",
      ],
      "newlines-between": "always-and-inside-groups",
      pathGroups: [
        {
          pattern: "../**/!(*.svelte|*.css)",
          group: "parent",
        },
        {
          pattern: "./**/!(*.svelte|*.css)",
          group: "sibling",
        },
        {
          pattern: "~/**/!(*.svelte|*.css)",
          group: "internal",
        },
        {
          pattern: "../**/*.svelte",
          group: "sibling",
          position: "after",
        },
        {
          pattern: "./**/*.svelte",
          group: "sibling",
          position: "after",
        },
        {
          pattern: "~/**/*.svelte",
          group: "internal",
          position: "after",
        },
        {
          pattern: "./**/*.css",
          group: "object",
          position: "after",
        },
      ],
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
      named: {
        cjsExports: true,
        enabled: true,
        export: true,
        import: true,
        require: true,
        types: "types-last",
      },
    },
  ],
};
