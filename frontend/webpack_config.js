var path = require("path");


var PRODUCTION = "production";

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
    lib: ["react", "react-dom", "redux", "react-router",
      "react-redux", "react-router-redux", "axios",
      "react-router", "immutable"]
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
      path: path.join(__dirname, "../app_server/app/assets/javascripts"),
      publicPath: "/assets/",
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
    loaders: ["style-loader", "css-loader", "sass-loader"]
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
      Radium: "radium",
      Immutable: "immutable"
    })
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
  } else {
    p.push(new webpack.HotModuleReplacementPlugin());
  }

  return p;
}
