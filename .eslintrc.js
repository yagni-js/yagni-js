
module.exports = {
  env: {
    es6: true,
    browser: true
  },
  plugins: [
    "functional",
    "better",
    "import"
  ],
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:functional/external-vanilla-recommended",
    "plugin:functional/recommended",
    "plugin:functional/stylistic"
  ],
  rules: {
    // eslint:recommended
    "comma-spacing": ["error", {before: false, after: true}],
    "comma-style": ["error", "last"],
    "eqeqeq": "error",
    "indent": ["error", 2, {SwitchCase: 1}],
    "key-spacing": ["error", {beforeColon: false, afterColon: true}],
    "keyword-spacing": ["error", {before: true, after: true}],
    "no-unused-vars": "error",
    // eslint-plugin-better
    "better/no-ifs": "error",
    "better/no-new": "error",
    "better/no-instanceofs": "error",
    "better/explicit-return": "error",
    "better/no-deletes": "error",
    "better/no-exceptions": "error",
    "better/no-classes": "error",
    "better/no-exports": "off",
    "better/no-fors": "error",
    "better/no-function-expressions": "error",
    "better/no-imports": "off",
    "better/no-nulls": "error",
    "better/no-reassigns": "error",
    "better/no-switches": "error",
    "better/no-this": "error",
    "better/no-typeofs": "error",
    "better/no-undefined": "error",
    "better/no-variable-declaration": "error",
    "better/no-whiles": "error",
    // eslint-plugin-import
    "import/no-extraneous-dependencies": "error",
    "import/no-absolute-path": "error",
    "import/no-mutable-exports": "error",
    "import/no-commonjs": "error",
    "import/no-amd": "error",
    "import/no-nodejs-modules": "error",
    // eslint-plugin-functional
    "functional/functional-parameters": ["error", {
      allowRestParameter: false,
      allowArgumentsKeyword: false,
      enforceParameterCount: {
        count: "atLeastOne",
        ignoreIIFE: true
      }
    }],
    // FIXME (?)
    "functional/prefer-tacit": "off"
  },
  settings: {
    "import/internal-regex": new RegExp('^@yagni-js/')
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
};
