module.exports = {
  "extends": "standard",
  "rules": {
    "react/jsx-uses-vars": 1,
    "indent": ["error", 2],
    "semi": [2, "always"],
    "quotes": ["error", "double"],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
  "ecmaFeatures": {
    "jsx": true 
  },
  "plugins": [
    "react"
  ],
  "globals": {
    "window": true,
    "Immutable": true,
    "React": true,
    "FB": true,
    "document": true
  }
};
