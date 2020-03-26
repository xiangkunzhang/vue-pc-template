const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = new RegExp(/\.(js|css|json|txt|html)(\?.*)?$/i)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  // outputDir: './dist',
  // assetsDir: isProduction ? './static' : '',
  // publicPath: isProduction ? publicPath : '/',
  productionSourceMap: false,
  devServer: { port: 4321, open: true },
  configureWebpack: config => {
    const plugins = []
    if (isProduction) {
      plugins.push(new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
    config.externals = {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'axios': 'axios',
      'lodash': '_',
      'moment': 'moment',
      'element-ui': 'ELEMENT'
    }
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    const cdn = {
      css: ['//cdn.jsdelivr.net/npm/element-ui@2.13.0/lib/theme-chalk/index.css'],
      js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.1.3/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
        '//cdn.jsdelivr.net/npm/element-ui@2.13.0/lib/index.js',
        '//cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js',
        '//cdn.jsdelivr.net/npm/moment@2.24.0/min/moment-with-locales.min.js'
      ]
    }
    config.plugin('html').tap(args => {
      // html中添加cdn
      args[0].cdn = cdn
      return args
    })
    return config
  }
}
