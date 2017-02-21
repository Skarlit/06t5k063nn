let webpack = require("webpack");
let gulp = require("gulp");
let gutil = require("gutil");
let fs = require("fs");
let pathConfig = require("./path_config");
const getWebpackConfig = require("./webpack_config");

function log (err, stats) {
  if (err) throw new gutil.PluginError("webpack", err);
  gutil.log("[webpack]", stats.toString({}));
}

gulp.task("prod", () => {
  webpack(getWebpackConfig("prod"), log);
});

gulp.task("dev", () => {
  webpack(getWebpackConfig("dev"), log);
});

gulp.task("server", () => {
  let WebpackDevServer = require("webpack-dev-server");
  let path = require("path");
  let config = getWebpackConfig("dev");
  config.output.path = path.join(__dirname, "../tmp");
  // config.entry.app.unshift("webpack/hot/only-dev-server");
  config.entry.lib.unshift("webpack-dev-server/client?http://localhost:8080/");
  // config.entry.app.unshift("react-hot-loader/patch");
  let compiler = webpack(config);
  let server = new WebpackDevServer(compiler, {
        // webpack-dev-server options
    https: true,
    cert: fs.readFileSync(pathConfig.devCert, "utf8"),
    key: fs.readFileSync(pathConfig.devKey, "utf8"),
    contentBase: "./tmp",
    inline: true,
    noInfo: false,
    quiet: false,
    // hot: true,
    setup (app) {
    },
    staticOptions: {
    },
    historyApiFallback: true,
    clientLogLevel: "info",
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
        // It's a required option.
    publicPath: "/assets/",
    headers: { "X-Custom-Header": "yes" },
    stats: { colors: true }
  });
  server.listen(8080, "localhost", () => {});
});
