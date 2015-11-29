import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import autoprefixer from 'autoprefixer'

import config from '../config'

const paths = config.get('utils_paths')
const src = config.get('dir_src')
const dist = config.get('dir_dist')

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      `./${src}/index.jsx`
    ],
    vendor: config.get('vendor_dependencies')
  },
  output: {
    filename: `${dist}/[name].[hash].js`,
    chunkFilename: `${dist}/[id].[chunkhash].js`,
    path: paths.project(),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin(config.get('globals')),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: paths.src('static/templates/index.tmpl'),
      hash: false,
      filename: 'index.html',
      title: config.get('pkg').name || 'i am very title',
      favicon: paths.src('static/favicon/favicon.png'),
      inject: false,
      minify: {
        collapseWhitespace: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: config.get('utils_aliases')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          optional: ['runtime'],
          env: {
            development: {
              plugins: ['react-transform'],
              extra: {
                'react-transform': {
                  transforms: [{
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }]
                }
              }
            }
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass?includePaths[]=' + __dirname + 'node_modules/compass-mixins/lib'
        ]
      },
      {
        test: /\.less$/,
        loaders: [
          'style',
          'css',
          'postcss',
          'less'
        ]
      },
      {
        test: /\.tmpl$/,
        loaders: [
          'blueimp-tmpl'
        ]
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/,  loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?.*)?$/, loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2" },
      { test: /\.ttf(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?.*)?$/,   loader: "file-loader?prefix=fonts/&name=[path][name].[ext]" },
      { test: /\.svg(\?.*)?$/,   loader: "url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml" }
      /* eslint-enable */
    ]
  },
  sassLoader: {
    includePaths: paths.src('styles')
  },
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ]
}

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin(
  'vendor', `${dist}/[name].[hash].js`
)
commonChunkPlugin.__KARMA_IGNORE__ = true
webpackConfig.plugins.push(commonChunkPlugin)

export default webpackConfig
