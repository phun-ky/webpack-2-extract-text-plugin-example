var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var isExternal = (module) => {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('node_modules') >= 0;
};

var test_expressions = {
  images : /\.(png|ico|jpe?g|gif)$/i,
  stylus : /\.styl$/i,
  css : /\.css$/i,
  javascript: /\.(js|jsx)$/i,
  json: /\.(json|webmanifest)$/i,
  svg: /\.(svg)$/i
};


module.exports = {
  cache: false,
  bail: true,
  devtool: 'nosources-source-map',
  performance: {
    hints: 'warning'
  },
  target: 'web',
  output: {
    path: path.join(__dirname, '/assets/'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: __dirname
  },
  entry: {
    app: [
      'babel-polyfill',
      './src/main.js'
    ]
  },
  module: {
    rules: [{
      test: test_expressions.css,
      loader: extractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
          }
        },{
          loader: 'postcss-loader'
        }]
      })
    },{
      test: test_expressions.stylus,
      loader: extractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [{
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        },{
          loader: 'postcss-loader'
        },{
          loader: 'stylus-loader'
        }]
      })
    },{
      test: test_expressions.javascript,
      loader: 'babel-loader',
      exclude: 'node_modules',
      options: {
        presets: [['es2015', { 'modules': false }], 'stage-0']
      }
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      minimize: true
    }),
    new extractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': 'production'
      }
    })
  ]
};
