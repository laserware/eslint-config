import sveltePlugin from "eslint-plugin-svelte";

/**
 * Rules for `eslint-plugin-svelte`.
 * @see https://sveltejs.github.io/eslint-plugin-svelte/
 */
export const svelteLintRules = {
  // https://sveltejs.github.io/eslint-plugin-svelte/rules/html-closing-bracket-spacing
  "svelte/html-closing-bracket-spacing": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/html-quotes
  "svelte/html-quotes": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/mustache-spacing
  "svelte/mustache-spacing": "error",

  // Sometimes you do need to use @html tags.
  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-at-html-tags
  "svelte/no-at-html-tags": "off",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-dupe-use-directives
  "svelte/no-dupe-use-directives": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-extra-reactive-curlies
  "svelte/no-extra-reactive-curlies": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-ignored-unsubscribe
  "svelte/no-ignored-unsubscribe": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-immutable-reactive-statements
  "svelte/no-immutable-reactive-statements": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-spaces-around-equal-signs-in-attribute
  "svelte/no-spaces-around-equal-signs-in-attribute": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-unused-class-name
  "svelte/no-unused-class-name": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-unused-svelte-ignore
  "svelte/no-unused-svelte-ignore": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-useless-mustaches
  "svelte/no-useless-mustaches": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/require-optimized-style-attribute
  "svelte/require-optimized-style-attribute": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/require-store-callbacks-use-set-param
  "svelte/require-store-callbacks-use-set-param": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/infinite-reactive-loop
  "svelte/shorthand-attribute": ["error", { prefer: "always" }],

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/shorthand-directive
  "svelte/shorthand-directive": "error",

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/sort-attributes
  "svelte/sort-attributes": [
    "error",
    {
      order: [
        "this",
        "bind:this",
        { match: "/^data-*/u", sort: "alphabetical" },
        "id",
        "name",
        "slot",
        { match: "/^--/u", sort: "alphabetical" },
        ["style", "/^style:/u"],
        "class",
        { match: "/^class:/u", sort: "alphabetical" },
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
        ["/^bind:/u", "!bind:this", "/^on:/u"],
        { match: "/^use:/u", sort: "alphabetical" },
        { match: "/^transition:/u", sort: "alphabetical" },
        { match: "/^in:/u", sort: "alphabetical" },
        { match: "/^out:/u", sort: "alphabetical" },
        { match: "/^animate:/u", sort: "alphabetical" },
        { match: "/^let:/u", sort: "alphabetical" },
      ],
    },
  ],

  // https://sveltejs.github.io/eslint-plugin-svelte/rules/spaced-html-comment
  "svelte/spaced-html-comment": "error",
};
