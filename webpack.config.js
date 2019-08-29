const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './bin/client/src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.join(__dirname, '/bin/client/dist'),
    filename: 'bundle.min.js'
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  devServer: {
    publicPath: '/public/',
    proxy:{
      '/' : 'http://localhost:9000'
    },
    // contentBase: path.join(__dirname, './bin/client/dist/'),
    // watchContentBase:true,
    // hot: true,
    // inline: true 
  }
}