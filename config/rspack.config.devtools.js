const path = require("node:path");
const { defineConfig } = require("@rspack/cli");
const { srcDir, outputDir } = require("./contants");
const { rspack } = require("@rspack/core");

module.exports = defineConfig({
  extends: "./base.config.js",
  entry: {
    devtools: path.resolve(srcDir, "devtools/index.tsx"),
    devtools_portal: path.resolve(srcDir, "devtools/devtools_portal.tsx"),
  },
  output: {
    path: path.resolve(outputDir),
    filename: "[name].js",
  },
  plugins: [
    new rspack.CssExtractRspackPlugin({
      filename: "devtools.css",
    }),
    new rspack.HtmlRspackPlugin({
      filename: "devtools.html",
    }),
    new rspack.HtmlRspackPlugin({
      filename: "devtools_portal.html",
    }),
  ],
});
