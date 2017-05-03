const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: {
    app: ["./src/js/app.js"],
    search: ["./src/js/search/index.js"],
    character_creation: ["./src/js/character_creation/index.js"],
    lib: ["react", "react-dom", "redux", "react-modal",
      "react-redux", "react-router-redux", "axios",
      "react-router", "immutable", "redux-saga", "reselect", "babel-polyfill",
      "js-cookie", "ramda", "prop-types"],
    test: ["./src/js/test.js"] // for testing individual components
  },
  extractTextLoader: function () {
    return {
      test: /\.scss$/,
      loader: "style-loader!css-loader!postcss-loader!sass-loader",
      exclude: /flexboxgrid/
    };
  },
  flexGridLoader: function () {
    return {
      test: /\.css$/,
      loader: "style-loader!css-loader?modules",
      include: /flexboxgrid/
    };
  },
  babelLoader: function () {
    return {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: "babel-loader"
    };
  },
  commonChunk: function (env) {
    return new CommonsChunkPlugin({name: "lib", filename: env === "prod" ? "lib_[hash].js" : "lib.js"});
  }
};
