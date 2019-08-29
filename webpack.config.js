const path = require('path');


module.exports = {
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 1000
  },
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