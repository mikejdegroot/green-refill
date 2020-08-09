const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/index.html', to: '' }
      ]
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles.css',
      // chunkFilename: '[id].css'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new BrowserSyncPlugin({
      // browse to http://localhost:3000/ during development,
      // ./public directory is being served
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['dist'] }
    })
  ],
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: { presets: ['es2015'] }
      //   }
      // },
      {
          test: /\.scss$/,
          use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              {
                  loader: "css-loader",
                  options: {
                      // minimize: true,
                      // sourceMap: true
                  }
              },
              {
                  loader: "sass-loader"
              }
          ]
      },
    ]
  }
};
