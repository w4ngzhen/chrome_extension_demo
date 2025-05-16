const path = require("node:path");
module.exports = {
  srcDir: path.resolve(__dirname, "..", "src"),
  outputDir: path.resolve(__dirname, "..", "dist"),
  publicDir: path.resolve(__dirname, "..", "public"),
};
