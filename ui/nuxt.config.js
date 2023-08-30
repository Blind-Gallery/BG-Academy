export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  formulate: {
    configPath: '@/plugins/formulate.config.js'
  },
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }

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
    '@/assets/formulate.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@braid/vue-formulate/nuxt'

  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/apollo'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/'
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HASURA_URL || 'http://localhost:8080/v1/graphql',
        wsEndpoint: null
      }
    }
  },

  server: {
    port: process.env.PORT || 5000
  },

  auth: {
    strategies: {
      google: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: 'https://oauth2.googleapis.com/token',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        codeChallengeMethod: 'code',
        responseType: 'token id_token',
        client_id: process.env.GOOGLE_CLIENT_ID,
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: process.env.REDIRECT_URI,
        logoutRedirectUri: undefined,
        scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
      },
      social: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          token: 'https://oauth2.googleapis.com/token',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo',
          logout: 'https://example.com/logout'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        responseType: 'token',
        grantType: 'authorization_code',
        accessType: undefined,
        redirectUri: undefined,
        logoutRedirectUri: undefined,
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        state: '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',
        codeChallengeMethod: '',
        responseMode: '',
        acrValues: ''
        // autoLogout: false
      },
      oidc: {
        scheme: 'openIDConnect',
        clientId: process.env.GOOGLE_CLIENT_ID,
        endpoints: {
          configuration: 'https://accounts.google.com/.well-known/openid-configuration'
        },
        responseType: 'code',
        scope: ['openid', 'profile', 'email'],
        grantType: 'authorization_code'
      },
      local: {
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user'
          // autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          // user: { url: '/auth/user', method: 'get' }
          user: false
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      babelrc: true,
      // presets (env, [preset, options]) {
      //   return [
      //     ['@nuxt/babel-preset-app', options]
      //   ]
      // },
      presets: [
        [
          '@nuxt/babel-preset-app',
          {
            useBuiltIns: 'entry',
            corejs: '3.22'
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-nullish-coalescing-operator',
        '@babel/plugin-proposal-optional-chaining'
      ]
    },

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
    // eslint-disable-next-line space-before-function-paren
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      }
      config.module.rules.push({
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      })
      config.module.rules.push({
        test: /node_modules[\\/]@walletconnect/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
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
