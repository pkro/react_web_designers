const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PATH_SOURCE = path.join(__dirname, "./src"); // the source files we work oj
//const PATH_DIST = path.join(__dirname, "./dist"); // the output of webpack
const PATH_DIST = __dirname; // we want all existing relative paths to still work in the html file, so it should be deployed where the original was

module.exports = (env) => {
  const environment = env.environment;
  const isProduction = environment === "production";
  const isDevelopmen = environment === "development";

  return {
    watch: true,
    // https://webpack.js.org/configuration/mode
    mode: environment, // production and development are recognized by webpack, it's not just a helper variable for ourselves
    devServer: {
      // The dev server will serve content from this directory.
      contentBase: PATH_DIST,

      // Specify a host. (Defaults to 'localhost'.)
      host: "localhost",

      // Specify a port number on which to listen for requests.
      port: 8080,

      // When using the HTML5 History API (you'll probably do this with React
      // later), index.html should be served in place of 404 responses.
      historyApiFallback: true,

      // Show a full-screen overlay in the browser when there are compiler
      // errors or warnings.
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    // The point or points to enter the application. This is where Webpack will
    // start. We generally have one entry point per HTML page. For single-page
    // applications, this means one entry point.
    // ****** For traditional multi-page apps, we may have multiple entry points. ******
    // https://webpack.js.org/concepts#entry
    entry: [path.join(PATH_SOURCE, "./index.js")],

    // Tell Webpack where to emit the bundles it creates and how to name them.
    // https://webpack.js.org/concepts#output
    output: {
      path: PATH_DIST,
      //filename: "[name].[hash].js",
      filename: "js/[name].[hash].js",
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Apply this rule to files ending in .js(x)
          exclude: /node_modules/, // Don't apply to files residing in node_modules
          use: {
            loader: "babel-loader",
            //This option object will replace babel.config.js
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true, // Output the targets/plugins used when compiling
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: "> 0.25%, not dead", // we now can remove the targets from package.json
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
      // This plugin will generate an HTML5 file that imports all our Webpack
      // bundles using <script> tags. The file will be placed in `output.path`.
      // https://github.com/jantimon/html-webpack-plugin
      new HtmlWebpackPlugin({
        template: path.join(PATH_SOURCE, "./index.html"),
      }),
      //new CleanWebpackPlugin(), // ATTENTION this cleans the whole output directory which in this case is the project root!!!
    ],
  };
};
