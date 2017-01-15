var webpack = require("webpack");
var gulp = require("gulp");
var gutil = require("gutil");
var webpackConfigPath = "./webpack_config.js";

function log(err, stats) {
  if(err) throw new gutil.PluginError("webpack", err);
  gutil.log("[webpack]", stats.toString({}));
}

gulp.task("prod", function() {
  webpack(require(webpackConfigPath)("prod"), log);
});

gulp.task("dev", function() {
  webpack(require(webpackConfigPath)("dev"), log);
});

gulp.task("server", function() {
  var WebpackDevServer = require("webpack-dev-server");
  var path = require("path");
  var config = require(webpackConfigPath)("dev");
  config.output.path = path.join(__dirname, "../tmp");
  // config.entry.app.unshift("webpack/hot/only-dev-server");
  config.entry.lib.unshift("webpack-dev-server/client?http://localhost:8080/");
  // config.entry.app.unshift("react-hot-loader/patch");
  var compiler = webpack(config);
  var server = new WebpackDevServer(compiler, {
        // webpack-dev-server options
    contentBase: "./tmp",
    inline: true,
    proxy: {
      "/index.html": {
        "target": {
          "host": "localhost",
          "protocol": "http:",
          "port": 80
        },
        pathRewrite: {"^/index.html": ""},
        ignorePath: true,
        changeOrigin: false,
        secure: false
      },
    },
    // hot: true,
    setup: function(app) {
    },
    staticOptions: {
    },
    historyApiFallback: true,
    clientLogLevel: "info",
    quiet: false,
    noInfo: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
        // It's a required option.
    publicPath: "/assets/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
  });
  server.listen(8080, "localhost", function() {});
});
