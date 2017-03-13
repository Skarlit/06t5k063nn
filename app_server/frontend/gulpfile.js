let webpack = require("webpack");
let gulp = require("gulp");
let gutil = require("gutil");
const getWebpackConfig = require("./webpack_config");
const getServerConfig = require("./webpack.config.server");

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
  let server = new WebpackDevServer(compiler, getServerConfig);
  server.listen(8080, "localhost", () => {});
});
