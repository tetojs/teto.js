import { argv } from 'yargs'
import config from '../config'
import webpackConfig from '../webpack'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: config.coverage_enabled,
  frameworks: ['mocha', 'chai-sinon', 'chai-as-promised', 'chai'],
  preprocessors: {
    [`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
  },
  reporters: ['spec', 'coverage'],
  coverageReporter: {
    reporters: config.coverage_reporters,
    check: config.coverage_check
  },
  browsers: ['PhantomJS'],
  webpack: {
    devtool: webpackConfig.devtool,
    resolve: webpackConfig.resolve,
    plugins: webpackConfig.plugins,
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        include: config.utils_paths.client(),
        loader: 'isparta'
      }],
      loaders: webpackConfig.module.loaders
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  }
}

export default cfg => cfg.set(karmaConfig)
