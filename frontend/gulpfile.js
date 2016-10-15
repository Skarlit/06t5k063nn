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
  config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");
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
      // "^/((?!api/).)*$": {
      //   "target": {
      //     "host": "localhost",
      //     "protocol": "http:",
      //     "port": 80
      //   },
      //   ignorePath: true,
      //   changeOrigin: false,
      //   secure: false
      // }
    },
        // Can also be an array, or: contentBase: "http://localhost/",
        // Set this as true if you want to access dev server from arbitrary url.
        // This is handy if you are using a html5 router.
    setup: function(app) {
          // Here you can access the Express app object and add your own custom middleware to it.
          // For example, to define custom handlers for some paths:
          // app.get('/some/path', function(req, res) {
          //   res.json({ custom: 'response' });
          // });
    },
        // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
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
