var path = require("path");
var PRODUCTION = "production";

/*global __dirname */
/*eslint no-undef: "error"*/

module.exports = function(env) {
    env == "prod" ? PRODUCTION : "";
    return {
        context: __dirname,
        entry: {
            app: "./src/js/app.js",
            lib: ["react", "react-dom", "redux"]
        },
        output: output(env),
        module: {
            loaders: loaders(env)
        },
        watch: env != PRODUCTION,
        plugins: plugins(env)
    };
};

function output(env) {
    if (env == PRODUCTION) {
        return {
            path: path.join(__dirname, "../dist/js")
        };
    } else {
        return {
            path: path.join(__dirname, "./dist/js")
        };
    }
}

function loaders() {
    return [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel"
    }];
}

function plugins(env) {
    var webpack = require("webpack");
    var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
    var p = [
        new CommonsChunkPlugin("lib", "lib.js")
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
    }

    return p;
}
