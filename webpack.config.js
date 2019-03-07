const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.resolve('src'),
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
  },
  entry: 'index.jsx',
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        include: path.resolve('src'),
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
      template: path.resolve(__dirname, 'public/index.html'),
      title: 'barcode-scanner',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve('src'), 'node_modules'],
  },
};
