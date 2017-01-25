var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const PRODUCTION = "production";
const devPublicPath = "https://localhost:8080/assets/";

/*global __dirname */
/*eslint no-undef: "error"*/

module.exports = function(env) {
  env = env == "prod" ? PRODUCTION : "";
  return {
    context: __dirname,
    entry: entry(env),
    output: output(env),
    devtool: env == PRODUCTION ? "cheap-module-source-map" : "source-map",
    module: {
      loaders: loaders(env)
    },
    watch: env != PRODUCTION,
    plugins: plugins(env)
  };
};

function entry() {
  var e =  {
    app: ["./src/js/app.js"],
    search: ["./src/js/search/index.js"],
    character_creation: ["./src/js/character_creation/index.js"],
    lib: ["react", "react-dom", "redux", "react-router",
      "react-redux", "react-router-redux", "axios",
      "react-router", "immutable", "redux-saga", "reselect", "babel-polyfill"],
    app_style: ["./src/css/desktop.js"],
    mobile_style: ["./src/css/mobile.js"]
  };
  return e;
}

function output(env) {
  if (env == PRODUCTION) {
    return {
      path: path.join(__dirname, "../dist/js"),
      filename: "[name].js"
    };
  } else {
    return {
      path: path.join(__dirname, "./build/"),
      publicPath: devPublicPath,
      filename: "[name].js"
    };
  }
}

function loaders() {
  return [{
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    loader: "babel"
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      "style-loader", "css-loader!postcss-loader!sass-loader")
  },
  { test: /\.png$/, loader: "url-loader?limit=100000" },
  { test: /\.off(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }];
}

function plugins(env) {
  var webpack = require("webpack");
  var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

  var p = [
    new CommonsChunkPlugin("lib", "lib.js"),
    new webpack.ProvidePlugin({
      React: "react",
      Immutable: "immutable"
    }),
    new ExtractTextPlugin("[name].css")
  ];
  if (env == PRODUCTION) {
    var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
    p.push(new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: PRODUCTION
      }
    }));
    p.push(new UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
    var ManifestPlugin = require("webpack-manifest-plugin");
    p.push(new ManifestPlugin({
      fileName: "manifest.json",
      basePath: "/assets/",
      writeToFileEmit: true
    }));
  } else {
    p.push(new webpack.HotModuleReplacementPlugin());
  }

  return p;
}
