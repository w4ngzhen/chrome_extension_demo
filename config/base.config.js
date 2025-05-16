const { rspack } = require("@rspack/core");

const CSS_LOADER = {
  loader: "css-loader",
  options: {
    modules: {
      localIdentName: "[local]__[hash:base64:5]",
    },
  },
};

module.exports = {
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", '.json"'],
  },
  module: {
    rules: [
      {
        test: /\.([jt])sx$/,
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
            externalHelpers: true,
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
};
