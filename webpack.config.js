const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const Handlebars = require('handlebars')['default']

const path = require('path')
const fs = require('fs')

const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = '3000'
const IS_DEVELOP = false

module.exports = {
  SERVER_HOST: SERVER_HOST,
  SERVER_PORT: SERVER_PORT,

  devtool: 'cheap-module-eval-source-map',

  // devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://' + SERVER_HOST + ':' + SERVER_PORT,
    'webpack/hot/only-dev-server',
    './src/index'
  ],

  output: {
    // filename: 'bundle.js',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve('./dist')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('base.[hash].js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEV__': IS_DEVELOP
    }),
    new HtmlPlugin({
      templateContent: function (data) {
        return Handlebars.compile(
          fs.readFileSync(
            path.resolve(__dirname + '/src/templates/index.handlebars'), 'utf-8'
          )
        )(data.htmlWebpackPlugin.files)
      }
    })
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?stage=0'],
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.s?css$/,
      loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?includePaths[]=' + __dirname + 'node_modules/compass-mixins/lib!postcss',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.handlebars$/,
      loader: 'handlebars',
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.svg$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
      exclude: /node_modules/,
      include: __dirname
    }]
  },

  postcss: [
    require('autoprefixer')
  ],

  resolve: {
    extensions: ['', '.jsx', '.js'],
    modulesDirectories: ['node_modules'],
    alias: {
      app: __dirname + '/src/app',
      store: __dirname + '/src/store',
      utils: __dirname + '/src/utils'
    }
  },

  cssnext: {
    browsers: 'last 2 versions'
  }
}
