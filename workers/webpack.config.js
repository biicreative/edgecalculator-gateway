module.exports = {
  entry: "./src/all.js",
  mode: "development",
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "worker.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        type: "javascript/auto",
        use: []
      }
    ]
  }
};
