var fs = require("fs");
let pathConfig = require("./path_config");

module.exports = {
        // webpack-dev-server options
  https: true,
  cert: fs.readFileSync(pathConfig.devCert, "utf8"),
  key: fs.readFileSync(pathConfig.devKey, "utf8"),
  contentBase: "./tmp",
  inline: true,
  noInfo: false,
  quiet: false,
    // hot: true,
  setup (app) {},
  staticOptions: {},
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
};
