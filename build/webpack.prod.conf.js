const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const buildconfig = require('../config/buildConf')
const devServer = require('../config/devServerConf')
const baseWebpackConfig = require('./webpack.base.conf')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const assetsPath = function (_path) { // 
  /* 兼容多平台拼接编译输出文件路径 */
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? buildconfig.build.assetsSubDirectory
    : devServer.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}
module.exports = merge(baseWebpackConfig, {  
  mode: 'development',
  devtool: '#source-map' ,
  output: {
    path: buildconfig.build.assetsRoot,
    filename: assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': buildconfig.build.env
    }),   
    // 这个插件应该只用在 production 配置中，并且在loaders链中不使用 style-loader, 特别是在开发中使用HMR，因为这个插件暂时不支持HMR
    new MiniCssExtractPlugin({ // 打包css  webpack4 之后貌似打包在js里面
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),  
    // 此插件在输出目录中
       // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin(),

    // new HtmlWebpackPlugin({
    //   filename: buildconfig.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   // favicon: path.resolve(__dirname, 'favicon.ico'),s
    //   // minify: { // 压缩的方式
    //   //   removeComments: true,
    //   //   collapseWhitespace: true,
    //   //   removeAttributeQuotes: true       
    //   // },
    //   // // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   // chunksSortMode: 'dependency'
    // }),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }
        }
      }),
    ]
   }
})
