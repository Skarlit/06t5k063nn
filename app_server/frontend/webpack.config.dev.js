const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const pathConfig = require("./path_config");
const commonConfig = require("./webpack_common");

/* global __dirname */
/* eslint no-undef: "error" */

module.exports = {
  context: __dirname,
  entry: commonConfig.entry,
  output: {
    path: pathConfig.output.dev,
    publicPath: pathConfig.publicPath.dev,
    filename: "[name].js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      commonConfig.babelLoader(),
      commonConfig.extractTextLoader(),
      {
        test: /\.off(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.styl$/,
        loaders: ["style", "css", "stylus"]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ["file-loader?name=[hash].[ext]"]
      }
    ]
  },
  watch: true,
  plugins: [
    commonConfig.commonChunk("dev"),
    new webpack.ProvidePlugin({React: "react", Immutable: "immutable"}),
    new ExtractTextPlugin("[name].css"),
    new ManifestPlugin({fileName: "manifest.json", writeToFileEmit: true})
  ]
};
