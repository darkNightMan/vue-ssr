// process.env.NODE_ENV = 'production'
// const chalk = require('chalk')
// const rm = require('rimraf')
// const path = require('path')
// const ora = require('ora') // 一个很好看的 loading 插件
// const webpack = require('webpack')
// const buildConf = require('../config/buildConf')
// const webpackConfig = require('./webpack.prod.conf')
// console.log(webpackConfig)
// console.log( //  输出提示信息 ～ 提示用户请在 http 服务下查看本页面，否则为空白页
//   '正在为您打包........'
// )
// var spinner = ora('building for production...') // 使用 ora 打印出 loading + log
// spinner.start() // 开始 loading 动画

// rm(path.join(buildConf.build.assetsRoot, buildConf.build.assetsSubDirectory), err => {
//   if (err) throw err
//   webpack(webpackConfig, function (err, stats) {
//     spinner.stop()
//     if (err) throw err
//     process.stdout.write(process.toString({
//       colors: true,
//       modules: false,
//       children: false,
//       chunks: false,
//       chunkModules: false
//     }) + '\n\n')
//     console.log(chalk.cyan('  Build complete.\n'))
//     console.log(chalk.yellow(
//       '  Tip: built files are meant to be served over an HTTP server.\n' +
//       '  Opening index.html over file:// won\'t work.\n'
//     ))
//   })
// })