const path = require('path');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: '[name]__[local]__[hash:base64]',
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new TypedCssModulesPlugin({
      globPattern: 'src/**/*.css',
    }),
  ],
};
