import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const paths = config.utils_paths
const debug = _debug('app:webpack:_base')
debug('Create configuration.')

const CSS_LOADER = !config.compiler_css_modules
  ? 'css?sourceMap'
  : [
    'css?modules',
    'sourceMap',
    'importLoaders=1',
    'localIdentName=[name]__[local]___[hash:base64:5]'
  ].join('&')

const babelLoaderQuery = {
  cacheDirectory: true,
  plugins: [
    'transform-runtime',
    'add-module-exports',
    'transform-decorators-legacy'
  ],
  presets: ['es2015', 'react', 'stage-0'],
  env: {
    development: {
      plugins: [
        ['react-transform', {
          // omit HMR plugin by default and _only_ load in hot mode
          transforms: [{
            transform: 'react-transform-catch-errors',
            imports: ['react', 'redbox-react']
          }]
        }]
      ]
    }
  }
}

const webpackConfig = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      paths.base(config.dir_client) + '/index.jsx'
    ],
    vendor: config.compiler_vendor
  },
  output: {
    filename: `${config.dir_dist}/[name].[${config.compiler_hash_type}].js`,
    chunkFilename: `${config.dir_dist}/[id].[chunkhash].js`,
    path: paths.base(),
    publicPath: config.compiler_public_path
  },
  plugins: [
    new webpack.DefinePlugin(config.globals),
    // new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 20 }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: paths.client('static/templates/index.tmpl'),
      hash: false,
      filename: 'index.html',
      title: 'i am very title',
      favicon: paths.client('static/favicon/favicon.png'),
      inject: false,
      minify: {
        collapseWhitespace: false
      }
    })
  ],
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.json', '.js', '.jsx', '.async.js', '.async.jsx'],
    alias: config.utils_aliases
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.async\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'bundle',
          'babel?' + JSON.stringify(babelLoaderQuery)
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          'babel?' + JSON.stringify(babelLoaderQuery)
        ]
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          CSS_LOADER,
          'postcss',
          'sass'
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
        test: /\.css$/,
        loaders: [
          'style',
          'css',
          'postcss'
        ]
      },
      {
        test: /\.tmpl$/,
        loaders: ['blueimp-tmpl']
      },
      /* eslint-disable */
      { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
      { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
      /* eslint-enable */
    ]
  },
  sassLoader: {
    includePaths: [
      paths.base('node_modules/compass-mixins/lib'),
      paths.client('static/themes/default/styles')
    ]
  },
  postcss: [
    cssnano({
      sourcemap: true,
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      }
    })
  ],
  eslint: {
    configFile: paths.base('.eslintrc')
  }
}

// NOTE: this is a temporary workaround. I don't know how to get Karma
// to include the vendor bundle that webpack creates, so to get around that
// we remove the bundle splitting when webpack is used with Karma.
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: ['vendor'],
  filename: `${config.dir_dist}/[name].[${config.compiler_hash_type}].js`
})
commonChunkPlugin.__KARMA_IGNORE__ = true

webpackConfig.plugins.push(commonChunkPlugin)

export default webpackConfig
