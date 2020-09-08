#!/bin/bash

npm init

npm i -D webpack webpack-cli @babel/core @babel/cli @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin clean-webpack-plugin webpack-dev-server

npm i core-js react react-dom

cat > ./webpack.config.js << EOL
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATH_SOURCE = path.join(__dirname, "./src"); // the source files we work oj
//const PATH_DIST = path.join(__dirname, "./dist"); // the output of webpack
const PATH_DIST = __dirname;

module.exports = (env) => {
  const environment = env.environment;
  const isProduction = environment === "production";
  const isDevelopmen = environment === "development";

  return {
    watch: true,
    mode: environment, 
    devServer: {
      contentBase: PATH_DIST,
      host: "localhost",
      port: 8080,
      historyApiFallback: true,
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    entry: [path.join(PATH_SOURCE, "./index.js")],
    output: {
      path: PATH_DIST,
      filename: "js/[name].[hash].js",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/, 
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true,
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: "> 0.25%, not dead", 
                  },
                ],
                "@babel/preset-react",
              ],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, "./index.html"),
      }),
      //new CleanWebpackPlugin(), // ATTENTION this cleans the whole output directory which in this case is the project root!!!
    ],
  };
};
EOL