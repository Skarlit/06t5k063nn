const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")

module.exports = {
  entry: {
    app: ["./src/js/app.js"],
    search: ["./src/js/search/index.js"],
    character_creation: ["./src/js/character_creation/index.js"],
    lib: ["react", "react-dom", "redux", "react-modal",
      "react-redux", "react-router-redux", "axios",
      "react-router", "immutable", "redux-saga", "reselect", "babel-polyfill"],
    app_style: ["./src/css/desktop.js"],
    mobile_style: ["./src/css/mobile.js"]
  },
  extractTextLoader: function() {
    return {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader!postcss-loader!sass-loader!stylus-loader"}),
    }
  },
  babelLoader: function() {
    return { 
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loaders: ["babel-loader"]
    };
  },
  commonChunk: function(env) {
    return new CommonsChunkPlugin({name: "lib", filename: env == "prod" ? "lib_[hash].js" : "lib.js"})
  }
}