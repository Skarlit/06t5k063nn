module.exports = function (env) {
  return env == "production" ? require("./webpack.config.prod") : require("./webpack.config.dev");
};
