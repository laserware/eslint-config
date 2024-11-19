import importPlugin from "eslint-plugin-import";
import sveltePlugin from "eslint-plugin-svelte";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tsEslint from "typescript-eslint";

import {
  getBaseConfigs,
  filePatterns,
  rules as baseRules,
  plugins as basePlugins,
} from "./base.mjs";
import { svelteLintRules } from "./rules/svelte.rules.mjs";

// Forward exports so you don't need to import them from `base` at the
// point of use.
export { filePatterns } from "./base.mjs";

export const rules = {
  ...baseRules,
  svelte: svelteLintRules,
};

export const plugins = {
  ...basePlugins,
  sveltePlugin,
};

/**
 * Returns an array of ESLint configuration objects with rules specific to
 * Svelte projects.
 *
 * @param {ConfigOptions} options Options for the configuration.
 */
export function getSvelteConfigs(options) {
  const { tsConfigFiles = [], tsConfigRootDir } = options;

  const baseConfigs = getBaseConfigs(options);

  return [
    ...baseConfigs,
    ...sveltePlugin.configs["flat/recommended"],
    {
      files: filePatterns.svelte,
      ignores: ["node_modules", "**/svelte.config.*"],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.browser,
          ...globals.node,
        },
        parser: svelteParser,
        parserOptions: {
          ecmaVersion: "latest",
          extraFileExtensions: [".svelte"],
          parser: tsEslint.parser,
          project: tsConfigFiles,
          tsConfigRootDir,
        },
      },
      plugins: {
        import: importPlugin,
        unicorn: unicornPlugin,
      },
      rules: {
        ...baseRules.core,
        ...baseRules.import,
        ...baseRules.typescript,
        ...baseRules.unicorn,
        ...svelteLintRules,
        // Duplicate import checks cause issues with importing from the same
        // file/library in a module context script block and a regular script
        // block. This is something I do fairly often, so I don't want it to
        // deal with the errors:
        "no-duplicate-imports": "off",
      },
      settings: {
        "import/resolver": {
          typescript: {
            project: tsConfigFiles,
            extensions: [".d.ts", ".json", ".mjs", ".mts", ".svelte", ".ts"],
          },
        },
      },
    },
  ];
}
