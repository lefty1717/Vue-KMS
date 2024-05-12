/* eslint-env node */
module.exports = {
  root: true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "comma-dangle": ["error", "never"],
    "object-curly-spacing": ["error", "always"],
    "vue/multi-word-component-names": "off",
    "no-console": "off",
    "no-debugger": "off"
  },
  ignorePatterns: [".eslintrc.cjs", "node_modules", "build", "dist", "public"]
};
