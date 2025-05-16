const path = require("node:path");
const { defineConfig } = require("@rspack/cli");
const { srcDir, outputDir, publicDir } = require("./contants");
const { rspack } = require("@rspack/core");

module.exports = defineConfig({
  extends: "./base.config.js",
  entry: {
    popup: path.resolve(srcDir, "popup/index.tsx"),
  },
  output: {
    path: path.resolve(outputDir),
    filename: "popup.js",
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({
      filename: "popup.css",
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(publicDir, "popup.html"),
      filename: "popup.html",
    }),
  ],
});
