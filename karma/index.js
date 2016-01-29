import { argv } from 'yargs'
import config from '../config'
import webpackConfig from '../webpack'

const debug = require('debug')('app:karma')
debug('Create configuration.')

const karmaConfig = {
<<<<<<< HEAD
  basePath: '../', // project root in relation to .bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/**/*.js`,
=======
  basePath: '../', // project root in relation to bin/karma.js
  files: [
    './node_modules/phantomjs-polyfill/bind-polyfill.js',
    {
      pattern: `./${config.dir_test}/test-bundler.js`,
>>>>>>> crossjsMaster/master
      watched: false,
      served: true,
      included: true
    }
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha', 'chai-sinon', 'chai-as-promised', 'chai'],
  preprocessors: {
<<<<<<< HEAD
    [`${config.dir_test}/**/*.js`]: ['webpack']
=======
    [`${config.dir_test}/test-bundler.js`]: ['webpack', 'sourcemap']
>>>>>>> crossjsMaster/master
  },
  reporters: ['spec'],
  browsers: ['PhantomJS'],
  webpack: {
    devtool: 'inline-source-map',
    resolve: webpackConfig.resolve,
<<<<<<< HEAD
    plugins: webpackConfig.plugins
      .filter(plugin => !plugin.__KARMA_IGNORE__),
=======
    plugins: webpackConfig.plugins,
>>>>>>> crossjsMaster/master
    module: {
      loaders: webpackConfig.module.loaders
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: {
    reporters: config.coverage_reporters
  }
}

if (config.coverage_enabled) {
  karmaConfig.reporters.push('coverage')
  karmaConfig.webpack.module.preLoaders = [{
    test: /\.(js|jsx)$/,
    include: new RegExp(config.dir_client),
<<<<<<< HEAD
    loader: 'isparta'
=======
    loader: 'isparta',
    exclude: /node_modules/
>>>>>>> crossjsMaster/master
  }]
}

export default cfg => cfg.set(karmaConfig)
