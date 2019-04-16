### Build Setup

```
  # install dependencies   安装依赖
  npm install

  # serve no reload at localhost:10085   ## 本地开发模式
  npm run dev

  # node serve  reload at localhost:8022  ## 开启node服务
  npm run start

  # build for production with minification  ## 打包客户端
  npm run build  

  # build for production with SSR  ##  ssr前后端同构打包
  npm run ssr

```

## 搭建自己简单的ssr-demo



### 前言
  ##### 最近在琢磨ssr的渲染原理，通过这几天的学习和了解也看了很多文章和一些demo，对于一个新手来说学习成本相对会比较高，无论是对webpack的打包机制 ，
  ##### 和对vue生命周期的理解，以及对服务端node服务端掌握都是需要一定的积累的， 每个人的写法和讲解都有不同再刚开始接触的也是有很多疑问 
  ##### 只能通过慢慢去理解别人消化的东西然后慢慢转换成自己理解范畴，所以自己也在不断试错和采坑中，所有打算重零开始自己搭建一个ssr-demo
  ##### 方便于更好理解和学习服务端ssr渲染的原理并分享学习过程中遇到的问题需注意的地方同时希望能够对学习SSR的朋友起到一点帮助。
 

##### 服务端渲染的优点
  1.更好的SEO，搜索引擎爬虫可以抓取渲染好的页面
  2.更快的内容到达时间（首屏加载更快），因为服务端只需要返回渲染好的HTML，这部分代码量很小的，所以用户体验更好

#### 服务端渲染的缺点
  1.首先就是开发成本比较高，比如声明周期钩子函数(beforeCreate、created）能同时运行在服务端和客户端.
  2.由于服务端渲染要用Nodejs做中间层，所以部署项目时，需要处于Node.js server运行环境。在高流量环境下，还要做好服务器负载和缓存策略


## SSR的实现原理
### 在服务端拿数据进行解析渲染，直接生成html片段返回给前端，这样就得到首屏加载的html页面，之后页面的请求数据渲染就然后客户端js去处理，
### 所以在打包ssr项目的需要两个打包js的入口文件
先来一张图官方的图解
![aratar](https://images2018.cnblogs.com/blog/701424/201805/701424-20180505045737014-897206613.png)

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