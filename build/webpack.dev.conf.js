const path = require('path'); //node的路径模块
const config = require('../config/devServerConf.js') // devServer 配置
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = merge(baseConfig,{
  devtool: '#source-map',
  devServer: {
    host: config.dev.host,
    hot: config.dev.hot,
    port: config.dev.port,
    open: config.dev.autoOpenBrowser,
    contentBase: path.resolve(__dirname,'../'),
    quiet: false,
    proxy: config.dev.proxyTable
  },
  plugins :[
    new webpack.DefinePlugin({  // 设置node 全局变量 判断当前build 环境
      'process.env': config.dev.env
    }),
     //热更新插件
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.dev.html',
      favicon: path.resolve('favicon.ico'),
      inject: true
    }),
  ]
})