const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  return {
    entry: ['core-js/stable', 'regenerator-runtime/runtime', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'static/js/[name].[contenthash:8].js',
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      publicPath: '/',
      clean: true,
    },
    devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env', { targets: { browsers: ['last 2 versions'] } }],
                  '@babel/preset-react',
                  '@babel/preset-typescript'
                ],
                plugins: ['babel-plugin-styled-components']
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                compilerOptions: {
                  module: 'esnext',
                  moduleResolution: 'node',
                }
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        // favicon: './public/favicon.ico',
        inject: true,
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development'),
        }
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: 'single',
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      historyApiFallback: true,
      compress: true,
      port: 3000,
      hot: true,
    },
    performance: {
      hints: isProduction ? 'warning' : false,
    },
  };
}; 