const path = require('path')
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = (env, argv) => {
  const ENV = argv.mode || 'development' // production|development
  console.log('webpack ENV: ', ENV)

  const config = {
    name: 'main-config',
    entry: {
      main: './src/main.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist/assets')
    },
    mode: ENV,
    watch: false,
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src/')
      },
      modules: ['node_modules'],
      extensions: ['.js', '.json']
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 9000,
    },
    devtool: ENV === 'production' ? undefined : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(p?css|postcss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.js$/,
          loader: 'esbuild-loader',
          options: {
            target: 'es2020'
          }
        },
        {
          test: /\.(png|svg|jpg|gif|ico)$/,
          type: 'asset/resource',
          generator: {
            filename: 'imgs/[name][ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(pdf|xlsx|docx|pptx|mp4|xml)$/,
          type: 'asset/resource',
          generator: {
            filename: 'files/[name][ext]'
          }
        },
        {
          test: /\.(html)$/,
          type: 'asset/resource',
          generator: {
            filename: '[name][ext]',
            outputPath: '../'
          }
        }
      ]
    },
    optimization: {
      minimize: ENV === 'production', // ENV
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2020',
          css: true
        })
      ],
      removeEmptyChunks: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css'
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: ENV
      })
    ]
  }

  return config
}
