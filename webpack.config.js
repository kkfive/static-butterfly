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
  entry: './src/js/index.js',
  output: {
    filename: '[chunkhash].js',
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
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css'
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
