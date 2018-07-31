const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
         loaders: [
          {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
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
      })
    ]

}
