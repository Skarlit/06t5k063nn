module.exports = {
  "extends": "airbnb",
  "rules": {
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
