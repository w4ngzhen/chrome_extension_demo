const path = require("node:path");
const { defineConfig } = require("@rspack/cli");
const { rspack } = require("@rspack/core");

const srcDir = path.resolve(__dirname, "..", "src");
const outputDir = path.resolve(__dirname, "..", "dist");
const publicDir = path.resolve(__dirname, "..", "public");
const resDir = path.resolve(__dirname, "..", "resources");
const CSS_LOADER = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    },
  },
};

module.exports = defineConfig({
  entry: {
    // === Popup ===
    // popup ui
    popup: path.resolve(srcDir, "popup/index.tsx"),
    // === Devtools ===
    // devtools portal script
    devtools_portal: path.resolve(srcDir, "devtools/devtools_portal.ts"),
    // devtools panel ui
    devtools_panel: path.resolve(srcDir, "devtools/panel/index.tsx"),
    // devtools sidebar ui
    devtools_sidebar: path.resolve(srcDir, "devtools/sidebar/index.tsx"),
    // === Content Scripts ===
    // content scripts script
    content_scripts: path.resolve(srcDir, "content_scripts/index.ts"),
    // content inject scripts
    content_scripts_inject: path.resolve(
      srcDir,
      "content_scripts_inject/index.ts",
    ),
    // === Background ===
    // background(worker) scripts
    background: path.resolve(srcDir, "background/index.ts"),
  },
  output: {
    path: path.resolve(outputDir),
    filename: "[name].js",
  },
  plugins: [
    // each entry output css
    new rspack.CssExtractRspackPlugin({
      filename: "[name].css",
    }),
    // all html
    new rspack.HtmlRspackPlugin({
      template: path.resolve(publicDir, "popup.html"),
      filename: "popup.html",
      inject: false, // 源文件已经编写
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(publicDir, "devtools_portal.html"),
      filename: "devtools_portal.html",
      inject: false, // 源文件已经编写
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(publicDir, "devtools_panel.html"),
      filename: "devtools_panel.html",
      inject: false, // 源文件已经编写
    }),
    new rspack.HtmlRspackPlugin({
      template: path.resolve(publicDir, "devtools_sidebar.html"),
      filename: "devtools_sidebar.html",
      inject: false, // 源文件已经编写
    }),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          // 拷贝manifest.json文件至输出目录
          from: path.resolve(resDir),
        },
      ],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        loader: "builtin:swc-loader",
        exclude: [/[\\/]node_modules[\\/]/],
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
            externalHelpers: true, // <- 注意需要安装 @swc/helpers
          },
        },
      },
      {
        test: /\.css$/,
        use: [rspack.CssExtractRspackPlugin.loader, CSS_LOADER],
      },
      {
        test: /\.less$/,
        use: [rspack.CssExtractRspackPlugin.loader, CSS_LOADER, "less-loader"],
      },
    ],
  },
});
