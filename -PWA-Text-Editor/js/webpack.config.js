const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates the index.html file and injects the bundled scripts
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E',
      }),
      
      // Inject the custom service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Generates the manifest.json for PWA
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A text editor that can be installed as a PWA',
        background_color: '#31a9e1',
        theme_color: '#31a9e1',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        // CSS loaders
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Babel loader to transpile JavaScript
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
