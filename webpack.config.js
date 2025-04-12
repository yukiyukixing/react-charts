const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBar = require('webpackbar')
const CopyPlugin = require('copy-webpack-plugin')
const resolvePath = (...segments) => path.resolve(__dirname, ...segments)

module.exports = {
  mode: 'development',
  entry: resolvePath('src', 'index.js'),
  stats: 'errors-warnings',
  output: {
    path: resolvePath('docs'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@': resolvePath('src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('public', 'index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
    new webpackBar(),
  ],
  devServer: {
    static: {
      directory: resolvePath('public'),
    },
    hot: true,
  },
}
