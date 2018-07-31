const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
         loaders: [
          {
            test: /\.scss$/,
           use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: "css-loader",
                options: {sourceMap: true}
              },

              {loader: "resolve-url-loader"},
              {
                loader: "sass-loader",
                options: {sourceMap: true}
              }
            ]
          })
          }
        ]
    },
    entry: './app/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./app/index.html`,
        filename: './app/index.html'
      }),
      new ExtractTextPlugin({
        filename: "[name].css",
        allChunks: true
      }),
    ]

}
