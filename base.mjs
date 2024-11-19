import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import unicornPlugin from "eslint-plugin-unicorn";
import vitestPlugin from "eslint-plugin-vitest";
import globals from "globals";
import tsEslint from "typescript-eslint";

import { coreLintRules } from "./rules/core.rules.mjs";
import { importLintRules } from "./rules/import.rules.mjs";
import { typescriptLintRules } from "./rules/typescript.rules.mjs";
import { unicornLintRules } from "./rules/unicorn.rules.mjs";
import { vitestLintRules } from "./rules/vitest.rules.mjs";

/**
 * @typedef {Object} ConfigOptions
 * @desc Options for the base config.
 * @property {string[]} tsConfigFiles Array of files paths for `project` entry.
 * @property {string} tsConfigRootDir Path to the root directory with `tsconfig.json` files.
 */

export const filePatterns = {
  javascript: ["**/*.cjs", "**/*.mjs", "**/*.js"],
  typescript: ["**/*.cts", "**/*.mts", "**/*.ts"],
  // prettier-ignore
  configs: [
    "./*.config.*",
    "./*.cjs", "./*.cts",
    "./*.mjs", "./*.mts",
    "./*.js", "./*.ts",
  ],
  svelte: ["**/*.svelte", "*.svelte", "**/*.svelte.ts", "*.svelte.ts"],
  tests: ["**/*.test.*"],
};

/**
 * All rules used in ESLint configuration keyed by the plugin name.
 */
export const baseRules = {
  core: coreLintRules,
  import: importLintRules,
  typescript: typescriptLintRules,
  unicorn: unicornLintRules,
  vitest: vitestLintRules,
};

/**
 * Returns the ESLint base configuration array for JS/TS files.
 *
 * @param {ConfigOptions} options Options for the configuration.
 */
export function getBaseConfigs(options) {
  const { tsConfigFiles = [], tsConfigRootDir } = options;

  return [
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,

    /* JS/TS Config */
    {
      // prettier-ignore
      files: [
        ...filePatterns.javascript,
        ...filePatterns.typescript,
        ...filePatterns.configs,
      ],
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.browser,
          ...globals.node,
        },
        parser: tsEslint.parser,
        parserOptions: {
          project: tsConfigFiles,
          tsConfigRootDir,
        },
      },
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        ...coreLintRules,
        ...typescriptLintRules,
        ...unicornLintRules,
      },
    },

    /* Import Config */
    {
      // We include Svelte files to avoid needing to duplicate this configuration
      // for Svelte:
      files: [...filePatterns.typescript, ...filePatterns.svelte],
      languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      plugins: {
        import: importPlugin,
      },
      rules: importLintRules,
      settings: {
        "import/resolver": {
          typescript: {
            project: tsConfigFiles,
            extensions: [".d.ts", ".json", ".mjs", ".mts", ".svelte", ".ts"],
          },
        },
      },
    },

    /* Vitest Config */
    {
      files: filePatterns.tests,
      languageOptions: {
        globals: {
          ...vitestPlugin.environments.env.globals,
        },
      },
      plugins: {
        vitest: vitestPlugin,
      },
      rules: vitestLintRules,
      settings: {
        vitest: {
          typecheck: false,
        },
      },
    },

    /* JavaScript/Config Files Config */
    {
      files: [...filePatterns.configs, ...filePatterns.javascript],
      rules: {
        "no-console": "off",
        "no-restricted-exports": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },

    {
      ignores: ["node_modules", "**/*.snap"],
    },
  ];
}
