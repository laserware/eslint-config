"use strict";

const base = require("./index.cjs");

module.exports = {
  ...base,
  extends: [...base.extends, "plugin:svelte/recommended"],
  parserOptions: {
    ...base.parserOptions,
    extraFileExtensions: [".svelte"],
  },
  overrides: [
    ...base.overrides,
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      rules: {
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowAny: true,
          },
        ],
        "import/no-duplicates": "off",
        "svelte/no-at-html-tags": "off",
        "svelte/require-store-callbacks-use-set-param": "error",
        "svelte/no-ignored-unsubscribe": "error",
        "svelte/no-immutable-reactive-statements": "error",
        "svelte/no-unused-svelte-ignore": "error",
        "svelte/no-unused-class-name": [
          "error",
          { allowedClassNames: ["visuallyHidden", "noData"] },
        ],
        "svelte/no-useless-mustaches": "error",
        "svelte/html-quotes": "error",
        "svelte/mustache-spacing": "error",
        "svelte/no-extra-reactive-curlies": "error",
        "svelte/no-spaces-around-equal-signs-in-attribute": "error",
        "svelte/shorthand-attribute": "error",
        "svelte/shorthand-directive": "error",
        "svelte/spaced-html-comment": "error",
        "svelte/sort-attributes": [
          "error",
          {
            order: [
              // `this` property.
              "this",
              // `bind:this` directive.
              "bind:this",
              // data- attributes.
              { match: "/^data-*/u", sort: "alphabetical" },
              // `id` attribute.
              "id",
              // `name` attribute.
              "name",
              // `slot` attribute.
              "slot",
              // `--style-props` (Alphabetical order within the same group.)
              { match: "/^--/u", sort: "alphabetical" },
              // `style` attribute, and `style:` directives.
              ["style", "/^style:/u"],
              // `class` attribute.
              "class",
              // `class:` directives. (Alphabetical order within the same group.)
              { match: "/^class:/u", sort: "alphabetical" },
              // other attributes. (Alphabetical order within the same group.)
              {
                match: [
                  "!/:/u",
                  "!/^on*/u",
                  "!/^(?:this|id|name|style|class)$/u",
                  "!/^--/u",
                  "!/^data-*/u",
                ],
                sort: "alphabetical",
              },
              { match: "/^on*/u", sort: "alphabetical" },
              // `bind:` directives (other then `bind:this`), and `on:` directives.
              ["/^bind:/u", "!bind:this", "/^on:/u"],
              // `use:` directives. (Alphabetical order within the same group.)
              { match: "/^use:/u", sort: "alphabetical" },
              // `transition:` directive.
              { match: "/^transition:/u", sort: "alphabetical" },
              // `in:` directive.
              { match: "/^in:/u", sort: "alphabetical" },
              // `out:` directive.
              { match: "/^out:/u", sort: "alphabetical" },
              // `animate:` directive.
              { match: "/^animate:/u", sort: "alphabetical" },
              // `let:` directives. (Alphabetical order within the same group.)
              { match: "/^let:/u", sort: "alphabetical" },
            ],
          },
        ],
      },
    },
  ],
};
