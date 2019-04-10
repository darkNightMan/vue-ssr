```
# 安装运行时包根据顺序解释
# 1.axios - http 请求工具
# 2.compression - express 的 gzip 中间组件
# 3.cross-env - 跨平台环境变量设置工具
# 4.es6-promise - ie9 的 promise 支持
# 5.express - node web 框架
# 6.lru-cache - js 的 lru 缓存
# 7.serialize-javascript - js 对象序列化为 js 代码
# 8.vue - 这个不用说了吧
# 9.vue-router - vue 的前端路由通过 ssr 后有后端路由效果
# 10.vuex - vue 的状态管理工具 ssr 中前后端同步
# 11.vuex-router-sync - 路由同步工具

yarn add autoprefixer buble buble-loader css-loader \
url-loader html-webpack-plugin rimraf stylus \
stylus-loader sw-precache-webpack-plugin vue-loader \
vue-template-compiler webpack webpack-dev-middleware \
webpack-hot-middleware extract-text-webpack-plugin@2.0.0-rc3 --dev
# 开发&&打包时包
# 1.autoprefixer - css 前缀自动生成
# 2.buble - babel 的类似工具以后更换看看会不会有什么影响
# 3.buble-loader - 同上
# 4.css-loader - css 加载器
# 5.url-loader - file-loader 的包装，图片可以以base64导入
# 6.html-webpack-plugin - html 的资源加载生成
# 7.rimraf - 跨平台的删除工具
# 8.stylus - stylus 加载器类似 sass 但是个人不喜欢用 sass 所以用 stylus
# 9.stylus-loader - 同上
# 10.sw-precache-webpack - service-worker 支持
# 11.vue-loader - vue 文件加载器
# 12.vue-template-compiler - template to render
# 13.webpack - 模块打包工具
# 14.webpack-dev-middleware - 监听文件改动
# 15.webpack-hot-middleware - 热更新
# 16.extract-text-webpack-plugin - 独立生成css
```