import sveltePlugin from "eslint-plugin-svelte";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import svelteParser from "svelte-eslint-parser";
import tsEslint from "typescript-eslint";

import { getBaseConfigs, filePatterns } from "./base.mjs";
import { coreLintRules } from "./rules/core.rules.mjs";
import { typescriptLintRules } from "./rules/typescript.rules.mjs";
import { unicornLintRules } from "./rules/unicorn.rules.mjs";
import { svelteLintRules } from "./rules/svelte.rules.mjs";

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
        ...svelteLintRules,
      },
    },
  ];
}
