const webpack = require("webpack");
const ManifestPlugin = require("webpack-manifest-plugin");
const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
const pathConfig = require("./path_config");
const commonConfig = require("./webpack_common");
/* global __dirname */
/* eslint no-undef: "error" */

module.exports = {
  context: __dirname,
  entry: commonConfig.entry,
  output: {
    path: pathConfig.output.prod,
    publicPath: pathConfig.publicPath.prod,
    filename: "[name]_[hash].js"
  },
  devtool: "cheap-module-source-map",
  module: {
    loaders: [
      commonConfig.babelLoader(),
      commonConfig.extractTextLoader(),
      commonConfig.flexGridLoader(),
      { test: /\.off(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.styl$/,
        loaders: [
          "style",
          "css",
          "stylus"
        ]
      },
      { test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file-loader?name=[hash].[ext]"
        ]
      }
    ]
  },
  watch: false,
  plugins: [
    commonConfig.commonChunk("prod"),
    new webpack.ProvidePlugin({React: "react", Immutable: "immutable"}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: "production"
      }
    }),
    new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ManifestPlugin({
      fileName: "manifest.json",
      writeToFileEmit: true
    })
  ]
};

