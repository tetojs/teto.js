const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const Handlebars = require('handlebars')['default']

const path = require('path')
const fs = require('fs')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  // devtool: 'eval',

  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],

  output: {
    // filename: 'bundle.js',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    path: path.resolve('./dist')
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('shared.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEV__': false
    }),
    new ExtractTextPlugin('style.css', {
      allChunks: true
    }),
    new HtmlPlugin({
      templateContent: function (data) {
        return Handlebars.compile(
          fs.readFileSync(
            path.resolve(__dirname + '/src/templates/index.handlebars'), 'utf-8'
          )
        )(data.htmlWebpackPlugin.files)
        // return require('./src/templates/index.handlebars')(data.htmlWebpackPlugin.files)
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
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss'),
      exclude: /node_modules/,
      include: __dirname
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
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
    modulesDirectories: ['node_modules']
  },

  cssnext: {
    browsers: 'last 2 versions'
  }
}
