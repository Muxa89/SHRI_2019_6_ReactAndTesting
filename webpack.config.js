/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] }
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(svg|jpe?g|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          publicPath: '/images'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '*'],
    // Alias setting is needed to enable absolute path imports
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src')
    }
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8000,
    historyApiFallback: {
      disableDotRule: true
    },
    proxy: {
      '/api': 'http://localhost:3000/'
    }
  },
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
