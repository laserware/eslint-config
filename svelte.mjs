import importPlugin from "eslint-plugin-import";
import sveltePlugin from "eslint-plugin-svelte";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tsEslint from "typescript-eslint";

import { getBaseConfigs, filePatterns, baseRules } from "./base.mjs";
import { svelteLintRules } from "./rules/svelte.rules.mjs";

/**
 * Svelte-specific ESLint rules.
 */
export const svelteRules = svelteLintRules;

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
