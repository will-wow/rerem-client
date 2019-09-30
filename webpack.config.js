const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require("workbox-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    bundle: ["./src/main.js"]
  },
  resolve: {
    alias: {
      svelte: path.resolve("node_modules", "svelte")
    },
    extensions: [".ts", ".mjs", ".js", ".svelte"],
    mainFields: ["svelte", "browser", "module", "main"],
    // Absolute imports
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[id].js"
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: "svelte-loader",
          options: {
            emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          /**
           * MiniCssExtractPlugin doesn't support HMR.
           * For developing, use 'style-loader' instead.
           * */
          prod ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.(js|ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  mode,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      "process.env.API":
        mode === "production"
          ? "'https://rerem.gigalixirapp.com/api'"
          : "'http://localhost:4000/api'"
    }),
    new HtmlWebpackPlugin({
      title: 'Rerem',
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      title: 'Rerem',
      template: 'src/index.html',
      filename: '200.html'
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    port: 5000,
    historyApiFallback: true
  }
};
