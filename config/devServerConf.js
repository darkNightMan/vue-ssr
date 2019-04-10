const path = require('path')
module.exports = {
  // dev-server 配置
  dev: {
    env: require('./dev.env'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',   
    hot: false,  // 启用 webpack 的模块热替换特性（Hot Module Replacement）。
    host: 'localhost',     // host 地址 0.0.0.0 可ip 访问
    port:10085,            // 监听端口号。默认8080。
    autoOpenBrowser: true, // 启动webpack-dev-server后是否使用浏览器打开首页。
    publicPath: '',  // 设置内存中的打包文件的输出目录。区别于output.publicPath。
    cssSourceMap: '',
    proxyTable: {   // 代理配置，对于另外有单独的后端开发服务器API来说比较适合。
      '/api':
       {
         target: 'http://172.16.2.225:8069',
         changeOrigin: true,
        }
    },
  }
}