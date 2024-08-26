export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  formulate: {
    configPath: '@/plugins/formulate.config.js'
  },
  head: {
    title: 'Academy by Blind Gallery',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { hid: 'description', name: 'description', content: 'Your starting point to learn blockchain art' },
      { hid: 'og:title', property: 'og:title', content: 'Academy by Blind Gallery' },
      { hid: 'og:description', property: 'og:description', content: 'Your starting point to learn blockchain art' },
      { hid: 'og:image', property: 'og:image', content: 'https://cdn.discordapp.com/attachments/987378128106168403/1190353495740661780/academy-thumbnail.png?ex=65a17e15&is=658f0915&hm=909a7a3326080fc55f6f2f07b41bebbde5f70462e0ecb2af757dc317bcdb6392&' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'https://cdn.discordapp.com/attachments/987378128106168403/1190353495740661780/academy-thumbnail.png?ex=65a17e15&is=658f0915&hm=909a7a3326080fc55f6f2f07b41bebbde5f70462e0ecb2af757dc317bcdb6392&' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'Academy by Blind Gallery' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Your starting point to learn blockchain art' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://cdn.discordapp.com/attachments/987378128106168403/1190353495740661780/academy-thumbnail.png?ex=65a17e15&is=658f0915&hm=909a7a3326080fc55f6f2f07b41bebbde5f70462e0ecb2af757dc317bcdb6392&' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap' }
    ],
    script: [
      {
        src: 'https://code.iconify.design/2/2.0.3/iconify.min.js',
        body: true
      },
      { src: 'https://js.stripe.com/v3' }
    ]
  },
  plugins: [

    { src: '~/plugins/vue-stripe.js', ssr: false },
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
    { src: '~/plugins/notifications-ssr', ssr: true },
    { src: '~/plugins/notifications-client', ssr: false }
  ],

  env: {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_ACCOUNT: process.env.STRIPE_ACCOUNT,
    TEZOS_PROTOCOL: process.env.TEZOS_PROTOCOL
  },

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
    '@braid/vue-formulate/nuxt',
    '@nuxtjs/google-analytics',
    '@nuxt/postcss8'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss'

  ],

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID // Use as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID
    }
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/'
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.HASURA_URL || 'http://localhost:8080/v1/graphql',
        httpLinkOptions: {
          // todo: migrate this to the auth server
          headers: {
            'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET || 'myadminsecretkey'
          }
        },
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
        scheme: 'refresh',
        token: {
          property: 'token',
          global: true,
          required: true,
          type: 'Bearer'
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        user: {
          property: 'user',
          autoFetch: true
        },
        endpoints: {
          login: { url: '/auth/login', method: 'post' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/auth/user', method: 'get' },
          refresh: { url: '/auth/refresh', method: 'post' }
        }
      }
    }
  },

  build: {
    babel: {
      babelrc: true,
      // presets (env, [preset, options]) {
      //   return [
      //     ['@nuxt/babel-preset-app', options]
      //   ]
      // },
      env: {
        development: {
          compact: false
        }
      },
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
  },
  transpile: [
    '/plugins',
    'vue-stripe-checkout',
    'stripe-element-payment',
    '@vue-stripe/vue-stripe'
  ]
}

// "plugins": ["@babel/plugin-transform-nullish-coalescing-operator"]
