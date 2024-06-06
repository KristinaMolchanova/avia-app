const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const publicPath = isProd ? (process.env.PUBLIC_URL || '/avia-app/'): '/';

  return {entry: './src/index.tsx',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
        inject: 'body'
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc.json',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/tickets.json', to: '.' }, 
        { from: 'public/favicon.ico', to: '.' }
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(argv.mode),
      'process.env.PUBLIC_URL': JSON.stringify(publicPath)
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    historyApiFallback: true
  }}
};
