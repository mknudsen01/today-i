const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname);
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    file: path.resolve(ROOT_PATH, 'app/src/index'),
  },
  output: {
    path: path.join(__dirname, 'app/build/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(ROOT_PATH, 'app/build'),
    historyApiFallback: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015-native-modules', 'react'],
        },
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({     // Create HTML file that includes references to bundled CSS and JS.
      template: path.resolve(ROOT_PATH, 'app/src/index.ejs'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
};
