// import globals from "globals";
// import pluginJs from "@eslint/js";
// import eslintConfigPrettier from "eslint-config-prettier";

// /** @type {import('eslint').Linter.Config[]} */
// export default [
//   { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
//   pluginJs.configs.recommended,

//   eslintConfigPrettier,
// ];

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
  extends: ["@nuxtjs", "airbnb-base", "plugin:nuxt/recommended"],
  rules: {
    semi: ["error", "never"],
    "no-unused-vars": "off",
    "no-shadow": "off",
    "no-plusplus": "off",
    "no-param-reassign": [
      "error",
      {
        props: false,
      },
    ],
    "lines-between-class-members": "off",
    "default-case": "off",
    "max-len": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "import/no-extraneous-dependencies": "off",
    "import/extensions": "off",
    "template-curly-spacing": "off",
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ["TemplateLiteral"],
      },
    ],
    "vue/attributes-order": "error",
    "vue/no-v-html": 0,
    "vue/no-unused-components": "warn",
    "vue/no-use-v-if-with-v-for": [
      "error",
      {
        allowUsingIterationVar: true,
      },
    ],
    "no-console": "off",
    "prefer-destructuring": [
      "error",
      {
        object: true,
        array: false,
      },
    ],
    curly: ["error", "multi-line"],
    "no-spaced-func": "off",
    "vue/script-setup-uses-vars": "warn",
    "vue/no-reserved-component-names": [
      "warn",
      {
        disallowVueBuiltInComponents: false,
        disallowVue3BuiltInComponents: false,
      },
    ],
    "space-before-function-paren": "off",
    "arrow-parens": "off",
    "comma-dangle": "off",
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: ["return", "if", "for", "function", "with"],
      },
    ],
    "consistent-return": "off",
    "arrow-body-style": "off",
    "operator-linebreak": ["error", "before"],
    "no-return-assign": "off",
  },
};
