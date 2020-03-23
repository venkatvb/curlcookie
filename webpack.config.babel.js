import path from 'path'
import webpack from 'webpack';

export default {
  mode: 'development',
  target: 'node',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    library: 'curlcookie',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          cache: true,
        },
      },
    ],
  },
}
