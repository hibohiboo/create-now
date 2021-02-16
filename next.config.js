/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const withOffline = require('next-offline')
require('dotenv').config()
const MODE =
  process.env.npm_lifecycle_event === 'dev' ? 'development' : 'production'
const withDebug = !process.env['npm_config_nodebug'] && MODE == 'development'
const nextConfig = {
  webpack: (config) => {
    // src ディレクトリをエイリアスのルートに設定
    config.resolve.alias['~'] = resolve(__dirname, 'src')
    // config.resolve.extensions.push('.elm')
    // if (MODE === 'development') {
    //   config.module.rules.push({
    //     test: /\.elm$/,
    //     exclude: [/elm-stuff/, /node_modules/],
    //     use: [
    //       { loader: 'elm-hot-webpack-loader' },
    //       {
    //         loader: 'elm-webpack-loader',
    //         options: {
    //           // add Elm's debug overlay to output
    //           debug: withDebug,
    //         },
    //       },
    //     ],
    //   })
    // } else {
    //   config.module.rules.push({
    //     test: /\.elm$/,
    //     exclude: [/elm-stuff/, /node_modules/],
    //     use: {
    //       loader: 'elm-webpack-loader',
    //       options: {
    //         optimize: true,
    //       },
    //     },
    //   })
    // }

    return config
  },
  // manifest設定
  target: 'serverless',
  transformManifest: (manifest) => ['/'].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/create-now.now.sh\/third\/.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  // .envファイルから読み込んだ環境変数をnextで使用できるように定義
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
    FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_SECRET_PREVIOUS: process.env.SESSION_SECRET_PREVIOUS,
    UDONARIUM_URL: process.env.UDONARIUM_URL,
    UDONARIUM_DOMAIN: process.env.UDONARIUM_DOMAIN,
    TYRANO_DOMAIN: process.env.TYRANO_DOMAIN,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
  },
}

// PWA に対応
module.exports = withOffline(nextConfig)
