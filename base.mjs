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
    "**/*.config.{js,ts,cjs,cts,mjs,mts}",
    "**/.*rc",
    "**/.*rc.{js,ts,cjs,cts,mjs,mts}",
  ],
  svelte: ["**/*.svelte", "**/*.svelte.ts"],
  tests: ["**/*.test.*"],
};

export const plugins = {
  importPlugin,
  unicornPlugin,
  vitestPlugin,
};

/**
 * All rules used in ESLint configuration keyed by the plugin name.
 */
export const rules = {
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
      files: [
        ...filePatterns.configs,
        ...filePatterns.javascript,
        ...filePatterns.typescript,
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
      files: [
        ...filePatterns.javascript,
        ...filePatterns.typescript,
        ...filePatterns.svelte,
      ],
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
      files: [...filePatterns.javascript, ...filePatterns.configs],
      rules: {
        "no-console": "off",
        "no-restricted-exports": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-var-requires": "off",
      },
    },

    // Ensure you can use `require` in CommonJS files:
    {
      files: ["**/*.cjs", "**/*.cts"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },

    // Ensure you can define Vite __DEFINED_CONSTANTS__ in declaration files.
    // We also want to be able to use empty interfaces and objects in declaration
    // files:
    {
      files: ["**/*.d.ts"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-empty-object-type": "off",
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "variable",
            format: ["camelCase", "UPPER_CASE", "PascalCase"],
            leadingUnderscore: "allowDouble",
            trailingUnderscore: "allowDouble",
          },
        ],
      },
    },

    {
      ignores: ["node_modules", "**/*.snap"],
    },
  ];
}
