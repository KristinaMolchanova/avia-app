const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
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
      template: './public/index.html'
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc.json',
      context: 'src',
      files: '**/*.scss',
      failOnError: false,
      quiet: false
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 9000,
    historyApiFallback: true
  }
};
