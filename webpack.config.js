/**
 * @description: webpack配置文件
 * @author: 小康
 * @url: https://xiaokang.me
 * @Date: 2021-01-03 10:24:50
 * @LastEditTime: 2021-01-03 10:25:54
 * @LastEditors: 小康
 */
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptiomizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    index: './src/js/index.js',
    volantis: './src/js/volantis.js',
    font: './src/js/font.js'
  },
  output: {
    filename: '[chunkhash:8].js',
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // less解析
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      // css解析
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      // 排除 css js html 文件
      // { exclude: /\.(css|js|html)/, loader: 'file-loader' }
      {
        //解析字体
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader', // url-loader 也可以用来解析字体
        options: {
          publicPath:
            'https://cdn.jsdelivr.net/npm/static-butterfly/dist/font/',
          outputPath: 'font'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:
        process.env.NODE_ENV === 'development'
          ? 'css/[name].min.css'
          : 'css/[name].[contenthash:8].css'
    }),
    new OptiomizeCssAssetsWebpackPlugin()
  ],
  mode: process.env.NODE_ENV,
  devServer: {
    // 构建后的路径
    contentBase: resolve(__dirname, 'dist'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    hot: true
  }
}
