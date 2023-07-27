import webpack from 'webpack'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Blind Gallery Academy',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],

    script: [
      {
        src: 'https://code.iconify.design/2/2.0.3/iconify.min.js',
        body: true
      }
    ]
  },
  plugins: [
    { src: '@/plugins/vue-html2pdf', mode: 'client' }
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  server: {
    port: 4000
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    plugins: [
      @babel/plugin-transform-nullish-coalescing-operator
    ]
    // plugins: [
    //   new webpack.ProvidePlugin({
    //     // global modules
    //     $: 'jquery',
    //     _: 'lodash'
    //   })
    // ],
    // commonjsOptions: {
    //   transformMixedEsModules: true // Enable @walletconnect/web3-provider which has some code in CommonJS
    // },
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      config.module.rules.push({
        test: /node_modules[\\/]@walletconnect/,
        loader: 'babel-loader'
      })
      // Sets webpack's mode to development if `isDev` is true.
      if (isDev) {
        config.mode = 'development'
      }
      if (isClient) {
        config.optimization.splitChunks.maxSize = 200000
      }
    }
  }
}

// "plugins": ["@babel/plugin-transform-nullish-coalescing-operator"]
