const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const PRODUCTION = "production";
const devPublicPath = "https://localhost:8080/assets/";
const prodPublicPath = "https://kyaralist/assets/";

/* global __dirname */
/* eslint no-undef: "error"*/

module.exports = function (env) {
  env = env == "prod" ? PRODUCTION : "";
  return {
    context: __dirname,
    entry: entry(env),
    output: output(env),
    resolve: {
      modulesDirectories: ["node_modules", "spritesmith-generated"],
    },
    devtool: env == PRODUCTION ? "cheap-module-source-map" : "source-map",
    module: {
      loaders: loaders(env),
    },
    postcss() {
      return [
        require("postcss-sprites"),
      ];
    },
    watch: env != PRODUCTION,
    revision: env == PRODUCTION,
    plugins: plugins(env),
  };
};

function entry() {
  const e = {
    app: ["./src/js/app.js"],
    search: ["./src/js/search/index.js"],
    character_creation: ["./src/js/character_creation/index.js"],
    lib: ["react", "react-dom", "redux", "react-router", "react-modal",
      "react-redux", "react-router-redux", "axios",
      "react-router", "immutable", "redux-saga", "reselect", "babel-polyfill"],
    app_style: ["./src/css/desktop.js"],
    mobile_style: ["./src/css/mobile.js"],
    // images: ["./src/img/images.js"]
  };
  return e;
}

function output(env) {
  if (env == PRODUCTION) {
    return {
      path: path.join(__dirname, "./build/"),
      publicPath: prodPublicPath,
      filename: "[name]_[hash].js",
    };
  }
  return {
    path: path.join(__dirname, "./build/"),
    publicPath: devPublicPath,
    filename: "[name].js",
  };
}

function loaders() {
  return [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loaders: ["babel"],
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style-loader", "css-loader!postcss-loader!sass-loader!stylus-loader"),
  },
  // { test: /\.png$/, loader: "url-loader?limit=100000" },
  { test: /\.off(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
  { test: /\.styl$/,
    loaders: [
      "style",
      "css",
      "stylus",
    ] },
  { test: /\.(jpe?g|png|gif|svg)$/i,
    loaders: [
      "file-loader?name=[hash].[ext]",
    ] }];
}

function plugins(env) {
  const webpack = require("webpack");
  const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

  const p = [
    new CommonsChunkPlugin("lib", env == PRODUCTION ? "lib_[hash].js" : "lib.js"),
    new webpack.ProvidePlugin({
      React: "react",
      Immutable: "immutable",
    }),
    new ExtractTextPlugin(env == PRODUCTION ? "[name]_[hash].css" : "[name].css"),
  ];
  const ManifestPlugin = require("webpack-manifest-plugin");
  p.push(new ManifestPlugin({
    fileName: "manifest.json",
    writeToFileEmit: true,
  }));

  if (env == PRODUCTION) {
    const UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
    p.push(new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: PRODUCTION,
      },
    }));
    p.push(new UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }));
  } else {
    p.push(new webpack.HotModuleReplacementPlugin());
  }

  return p;
}
