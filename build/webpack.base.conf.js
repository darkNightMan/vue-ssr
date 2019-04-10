const path = require('path')
const buildConfig = require('../config/buildConf')
const devServer = require('../config/devServerConf') // devServer 配置
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devMode = process.env.NODE_ENV !== 'production';
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports  = {
  entry: {
    // 'babel-polyfill': 'babel-polyfill',
    clinet: './src/entry-clinet.js'
  },
  output: {
    path: buildConfig.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? buildConfig.build.assetsPublicPath
      : devServer.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules :[
      {
        test: /\.js$/,
        use: {
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter') // 默认的错误提示方式
            }
        },
        enforce: 'pre', // 编译前检查
        exclude: /node_modules/, // 不检测的文件
        include: [__dirname + '/src'], // 要检查的目录
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /.vue$/,
        loader: 'vue-loader' // 解析和转换 .vue 文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，再分别把它们交给对应的 Loader 去处理。      
      },      
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },     
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        use: [{
            loader: 'url-loader',          
            options: {
              limit: 10000,
              name: 'assets/[name].[hash:5].[ext]'
            }
          }],       
      },
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic webpack
    // 打包的时候vue-loader 报错 需要加载这个插件
    new VueLoaderPlugin()
  ],  
}