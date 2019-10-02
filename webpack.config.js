const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";
const api =
  mode === "production"
    ? "https://rerem.gigalixirapp.com/api"
    : "http://localhost:4000/api";

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
    publicPath: "/",
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
      "process.env.API": JSON.stringify(api)
    }),
    new HtmlWebpackPlugin({
      title: "Rerem",
      template: "src/index.html"
    }),
    new HtmlWebpackPlugin({
      title: "Rerem",
      template: "src/index.html",
      filename: "200.html"
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        // CDN Deps
        {
          urlPattern: new RegExp(
            "https://unpkg.com/ionicons@4.5.10-0/dist/ionicons"
          ),
          handler: "CacheFirst"
        },
        {
          urlPattern:
            "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
          handler: "CacheFirst"
        },
        // API GETs
        { urlPattern: new RegExp(api), handler: "NetworkFirst" }
      ]
    })
  ],
  devtool: prod ? false : "source-map",
  devServer: {
    port: 5000,
    historyApiFallback: true
  }
};
