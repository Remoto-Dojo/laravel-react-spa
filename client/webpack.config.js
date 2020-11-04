const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/main.js",
    print: "./src/print.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    proxy: {
      "/api": {
        target: process.env.API_URL
      },
      "/broadcasting": {
        target: process.env.API_URL
      }
    },
    contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
    publicPath: '/', //relative path to output path where  devserver will look for compiled files,
    hot: true
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, process.env.NODE_ENV === "production"
      ? '../public'
      : 'dist'
    ), // base path where to send compiled assets
    publicPath: '/' // base path where referenced files will be look for
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src') // shortcut to reference src folder from anywhere
    }
  },
  module: {
    rules: [
      { // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { // config for sass compilation
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: "sass-loader"
          }
        ]
      },
      { // config for images
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          }
        ],
      },
      { // config for fonts
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
            }
          }
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["css/*.*", "js/*.*", "fonts/*.*", "images/*.*"]
    }),
    new HtmlWebpackPlugin({ // plugin for inserting scripts automatically into html
      filename:
        process.env.NODE_ENV === "production"
          ? path.resolve(__dirname, '../resources/views/index.blade.php')
          : "index.html",
      template:
        process.env.NODE_ENV === "production"
          ? "../resources/stubs/production-index.blade.stub"
          : "../resources/stubs/development-index.stub",
      title: "Laravel - React Server Driven Single Page App"
    }),
    new MiniCssExtractPlugin({ // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ]
};
