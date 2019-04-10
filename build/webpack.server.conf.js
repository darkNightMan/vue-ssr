const merge = require('webpack-merge');
const webpack  = require('webpack');
const base = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRPlugin = require('vue-ssr-webpack-plugin')
const path = require('path');
const serveConfig = merge(base, {
  target: 'node',
  mode: 'production',
  entry: './src/entry-server.js',    
  
  output: {
    filename: 'server-bundle.js', // bundle.js
    libraryTarget: 'commonjs2'
  },
  // 只打包dependencies配置 里面所依赖的包模块
  externals: Object.keys(require('../package.json').dependencies),
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.ssr.html',
    //   filename: 'index.ssr.html',
    //   files: {
    //     js: 'clinet.js'
    //   }, // client.js需要在html中引入
    //   excludeChunks: ['server'] // server.js只在服务端执行，所以不能打包到html中
    // }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    // 这是将服务器的整个输出
    // 构建为单个 JSON 文件的插件。
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueSSRServerPlugin()
  ]
});
console.log(serveConfig,"SERVERS")
module.exports = serveConfig