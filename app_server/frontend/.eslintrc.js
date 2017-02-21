module.exports = {
  "extends": "standard",
  "rules": {
    "indent": ["error", 2],
    "semi": [2, "always"],
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "globals": {
    "window": true,
    "Immutable": true,
    "React": true,
    "FB": true,
    "document": true
  }
};
