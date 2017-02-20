module.exports = {
  "extends": "standard",
  "rules": {
    "indent": [2, 4, {'SwitchCase': 1}],
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
