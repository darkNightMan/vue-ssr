
## 搭建自己简单的ssr框架



### 前言

 

##### 服务端渲染的优点
  1.更好的SEO，搜索引擎爬虫可以抓取渲染好的页面
  2.更快的内容到达时间（首屏加载更快），因为服务端只需要返回渲染好的HTML，这部分代码量很小的，所以用户体验更好

#### 服务端渲染的缺点
  1.首先就是开发成本比较高，比如某些声明周期钩子函数（如beforeCreate、created）能同时运行在服务端和客户端，
  因此第三方库要做特殊处理，才能在服务器渲染应用程序中运行。
  2.由于服务端渲染要用Nodejs做中间层，所以部署项目时，需要处于Node.js server运行环境。在高流量环境下，还要做好服务器负载和缓存策略







项目结构

```
.
├── README.md
├── build
│   ├── webpack.base.conf.js    ##  webpack 公共配置
│   ├── webpack.dev.conf.js     ##  webpack 本地开发配置
│   ├── webpack.prod.conf.js    ## 打包client端的配置
│   └── webpack.server.conf.js  ## 打包server端的配置
├── config
│   ├── buildConf.js      ## 打包配置项
│   ├── dev.env.js        ## 变量配置
│   ├── devServerConf.js  ## 开发配置项
│   └── prod.env.js       ## 变量配置    
├── favicon.ico
├── index.dev.html ## 本地开发模板
├── index.pro.html  ## 
├── package-lock.json
├── package.json
├── src
│   ├── App.vue     #  根 vue组件
│   ├── app.js      # 整合 router,store,vuex 的入口文件
│   ├── components  # 组件
│   │   ├── child.vue
│   │   ├── test.vue
│   │   ├── wang.vue
│   │   └── ys.vue
│   ├── entry-clinet.js   # 客户端js打包入口  生成bundle  
│   ├── entry-server.js   # 服务端js打包入口  生成bundle
│   ├── registerServiceWorker.js
│   ├── router
│   │   └── index.js
│   └── store
│       └── index.js
└── start.js
```






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