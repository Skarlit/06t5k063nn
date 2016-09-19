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
