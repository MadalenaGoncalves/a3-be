// Imports
// require('@babel/register'); // allow webpack config to be written in ES6
// const webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

const HOST = process.env.HOST;
const PORT = process.env.PORT;

// Webpack Configuration
const config = {
  // Entry
  entry: [
    '@babel/polyfill',
    './src/index.js',
  ],
  // Output
  output: {
    //publicPath: '/dist',
    path: path.join(__dirname, 'build'),
    filename: 'index.js'
  },
  // Ignore all modules in node_modules
  externals: [nodeExternals()],
  // Mode: none, development or production
  mode: 'development',
  // Loaders
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // devtool: 'inline-source-map',
  // Plugins
  plugins: [],
  // Compile for usage in a Node.js-like environment
  target: 'node',
  // Dev server
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    // do not print bundle build stats
    noInfo: false,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // enable HMR
    hot: true,
    // watchContentBase: true, // initiate a page refresh if static content changes
    // proxy: [ // allows redirect of requests to webpack-dev-server to another destination
    //   {
    //     context: ['/api'],  // can have multiple
    //     target: 'http://localhost:8080', // server and port to redirect to
    //     secure: false,
    //   },
    // ],
    //host: HOST,
    //port: PORT, // port webpack-dev-server listens to, defaults to 8080
    // overlay: { // Shows a full-screen overlay in the browser when there are compiler errors or warnings
    //   warnings: false, // defaults to false
    //   errors: false, // defaults to false
    // },
    // overlay: true,
    // stats: {
    //   colors: true,
    // },
  },
};
// Exports
module.exports = config;
