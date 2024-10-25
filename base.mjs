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
  base: ["**/*.js", "**/*.mjs", "**/*.mts", "**/*.ts"],
  configs: [
    "*.config.*",
    "vite.config.*",
    "vitest.config.*",
    "./*.cjs",
    "./*.cts",
    "./*.js",
    "./*.mjs",
    "./*.mts",
    "./*.ts",
  ],
  javascript: ["**/*.cjs", "**/*.js", "**/*.mjs"],
  svelte: ["**/*.svelte", "*.svelte", "**/*.svelte.ts", "*.svelte.ts"],
  tests: ["**/*.test.*"],
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
      files: filePatterns.base,
      languageOptions: {
        globals: {
          ...globals.builtin,
          ...globals.browser,
          ...globals.node,
        },
        parser: tsEslint.parser,
        parserOptions: {
          project: [...tsConfigFiles],
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
      files: [...filePatterns.base, ...filePatterns.svelte],
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
            project: [...tsConfigFiles],
            extensions: [".d.ts", ".json", ".mjs", ".svelte", ".ts", ".mts"],
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
