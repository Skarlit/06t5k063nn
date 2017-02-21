const path = require("path");

module.exports = {
  devCert: path.resolve(__dirname, "../../configs/development/server.crt"),
  devKey: path.resolve(__dirname, "../../configs/development/server.key"),
  webpackConfigDev: path.resolve(__dirname, "./webpack.config.dev.js"),
  publicPath: {
    dev: "https://localhost:8080/assets/",
    prod: "https://kyaralist/assets/"
  },
  output: {
    dev: path.join(__dirname, "./build/"),
    prod: path.join(__dirname, "./build/")
  }
};
