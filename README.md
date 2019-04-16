## 搭建自己简单的ssr-demo


[demo地址](https://note.youdao.com/) https://github.com/darkNightMan/vue-ssr
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
### 项目结构
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
│   ├── dev.env.js        ## 环境变量配置
│   ├── devServerConf.js  ## 开发配置项
│   └── prod.env.js       ## 环境变量配置    
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
# 3.cross-env - 跨平台环境变量设置工具
# 4.es6-promise - ie9 的 promise 支持
# 5.express - node web 框架
# 6.lru-cache - js 的 lru 缓存
# 7.serialize-javascript - js 对象序列化为 js 代码
# 8.vue - 这个不用说了吧
# 9.vue-router - vue 的前端路由通过 ssr 后有后端路由效果
# 10.vuex - vue 的状态管理工具 ssr 中前后端同步
# 11.vuex-router-sync - 路由同步工具


# 开发&&打包时包
# 1.autoprefixer - css 前缀自动生成
# 2.buble - babel 的类似工具以后更换看看会不会有什么影响
# 3.buble-loader - 同上
# 4.css-loader - css 加载器
# 4.vue-style-loader -
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




---
### 前言
##### 最近在琢磨ssr的渲染原理，通过这几天的学习和了解也看了很多文章和一些demo，对于一个新手来说学习成本相对会比较高，无论是对webpack的打包机制
##### 和对vue生命周期的理解，以及对服务端node服务端掌握都是需要一定的积累的， 每个人的写法和讲解都有不同再刚开始接触的也是有很多疑问 
##### 只能通过慢慢去理解别人消化的东西然后慢慢转换成自己理解范畴，所以自己也在不断试错和采坑中，所有打算重零开始自己搭建一个ssr-demo
##### 方便于更好理解和学习服务端ssr渲染的原理并分享学习过程中遇到的问题需注意的地方同时希望能够对学习SSR的朋友起到一点帮助。
 
---
### 服务端渲染的优点
  #####1.更好的SEO，搜索引擎爬虫可以抓取渲染好的页面
  #####2.更快的内容到达时间（首屏加载更快），因为服务端只需要返回渲染好的HTML，这部分代码量很小的，所以用户体验更好

### 服务端渲染的缺点
  1.首先就是开发成本比较高，比如声明周期钩子函数(beforeCreate、created）能同时运行在服务端和客户端.
  2.由于服务端渲染要用Nodejs做中间层，所以部署项目时，需要处于Node.js server运行环境。在高流量环境下，还要做好服务器负载和缓存策略


## SSR的实现原理
---

### 先来一张图官方的图解
![aratar](https://images2018.cnblogs.com/blog/701424/201805/701424-20180505045737014-897206613.png)
##### 大概意思就是在服务端生成html片段，实际上当然是会复杂点，比如服务端返回html片段，客户端直接接受显示，不做任何操作的话
##### 浏览器端无法触发点击事件这路由跳转这些的所以客户端便只需要激活这些静态页面，让他们变成动态的。
##### 通过vue提供 vue-server-renderer  转换成静态html片段，返回给客户端。会在根节点上附带一个 data-server-rendered="true" 的特殊属性。
##### 让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载

---
### 需注意的地方
##### vue-server-renderer 的版本 要与 vue版本一致
##### 服务端渲染只会执行 vue 的两个钩子函数 beforeCreate 和 created
##### 服务端渲染无法访问 window 和 document等只有浏览器才有的全局对象。
##### 假如你项目里面有全局引入的插件和JS文件或着在beforeCreate和created用到了的这些对象的话，是会报错的，因为服务端不存在这些对象。

---


#### 根据图解一步一步来拆分代码

从图可以看出app.js里面包含了vue 组件 vuex状态管理器 router路由...所以接下来将对我们所熟悉的 这几个文件对这些代码分隔进行一些改造
为了防止后端渲染中很容易导致交叉请求状态污染，导致数据流被污染了。所以避免状态单例,我们不应该直接创建一个应用程序实例，而是应该
暴露一个可以重复执行的工厂函数，为每个请求创建新的应用程序实例，同样router和store入口文件也需要重新创建一个实例这几个文件都已
createXXX这种方式声明函数名

### store.js 改造 暴露一个createStore 工厂函数
```
import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

// 创建一个工厂函数
export  function createStore() {
  return new Vuex.Store({
    state: {
      article: {},
      weather: {}
    },
    actions: {
      async GET_ARTICLE({commit}) {
        try {
          const {data} = await axios.get('https://www.86886.wang/api/article/5b38d0098c98760acf25bfac')
          commit('SET_ARTICLE', data)
        } catch (ex) {
          console.log(ex)
        }
      },

      async GET_WEATHER ({commit}) {
        try {
        const {data} = await axios.get('http://t.weather.sojson.com/api/weather/city/101030100')
        commit('SET_WEATHER', data.data)
        }catch (ex) {
            console.log(ex)     
        }
      },
    
    },
    mutations: {
      SET_ARTICLE(state, data) {
        state.article = data.data
      },
      SET_ARTICLE_VIEWS (state, data) {
        state.article.views = data
      },
      SET_WEATHER(state, data) {
        state.weather = data
      }
    }
  })
}
```
---
#### router.js 同样改造 暴露一个createRouter 工厂函数方便每次访问创建一个新的实例

```
import Router from 'vue-router'
import Vue from 'vue'
import Wang from '../components/wang.vue'
import Test from '../components/test.vue'
import YS from '../components/ys.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history', // 路由必须是history模式 因为服务的不支持hash路由
    routes: [
      {
        path: '/',
        name: 'wang',
        component: Wang
      },
      {
        path: '/test.html',
        name: 'test',     
        component: Test
      },
      {
        path: '/ys.html/',
        name: 'ys',     
        component: YS
      }
    ]
  })
}
 
```
---
### app.js 创建一个新的实例：
```
// app.js
import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router'
import { createStore }from './store'
import { sync } from 'vuex-router-sync'
// import './registerServiceWorker'
export function createApp () {
  // 创建 router 实例
  const router = createRouter()
  // 穿件 store 实列
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    // 注入 router 到根 Vue 实例
    router,
    store,
    render: h => h(App)
  })
  // 返回 app 和 router
  return { app, router ,store}
}
```

#### 接下来webpack打包入口的js代码 一个需要运行在客户端 一个运行在服务端


##### 客户端打包入口 entry-client.js
```
import { createApp } from './app'
import App from './App.vue';
import Vue from 'vue'
const {app, router, store} = createApp()

// 当路由再次切换时获取最新的数据填充在视图中
Vue.mixin({
  // beforeMount () {
  //   const { asyncData } = this.$options
  //   if (asyncData) {
  //     // 将获取数据操作分配给 promise
  //     // 以便在组件中，我们可以在数据准备就绪后
  //     // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route
  //     })
  //   }
  // },
  //
  beforeRouteEnter (to, from, next) {
    console.log('beforeRouteEnter')
    next((vm)=>{
      const { asyncData } = vm.$options
      if (asyncData) {
          asyncData({ store: vm.$store, route: vm.$route}).then(next).catch(next)
      } else {
          next()
      }
    })
  },
})


// 把store中的state 替换成 window.__INITIAL_STATE__ 中的数据
if (window.__INITIAL_STATE__) { 
  store.replaceState(window.__INITIAL_STATE__);
}
router.onReady(() => {
  app.$mount('#app')
})
```
---

##### 服务端打包入口 entry-server.js
```
    import { createApp } from './app'
    export default context => {
         // 这一步操作是为了预先获取数据以后在将内容渲染到客户端
      // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise， 以便服务器能够等待所有的内容在渲染前，
      return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()
        // 路由跳转
        console.log(context)
        router.push(context.url)
        // 路由下异步组件和钩子函数解析完
        router.onReady(() => {
          // 返回目标位置或是当前路由匹配的组件数组
          const matchedComponents = router.getMatchedComponents()
          console.log(matchedComponents)
          if (!matchedComponents.length) {
            return reject({ code: 404 })
          }
          //  // 遍历路由下所以的组件，如果有需要服务端渲染的请求，则进行请求
          Promise.all(matchedComponents.map(Component => {
            if (Component.asyncData) {
                return Component.asyncData({store,route: router.currentRoute })
            }
          })).then(() => {
            // 在所有预取钩子(preFetch hook) resolve 后，
            // 我们的 store 现在已经填充入渲染应用程序所需的状态。
            // 当我们将状态附加到上下文，
            // 并且 `template` 选项用于 renderer 时，
            // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
            context.state = store.state
            resolve(app)
          }).catch(reject)
        }, reject)
      })
    }
```
##### ==*router.getMatchedComponents() 在测试中发现当调用这个方法时只能获取到当前路由第一个根组件里面asyncData 里面的方法==
##### ==如果当前路由有多个子组件的话 并不能全部获取到如果在子组件预渲染数据的话此时可能还需要对改方法进行一些改造将当前路由==
##### ==下所有的组件循环出来并调用每个组件里面的asyncData的方法==
```
import Vue from 'vue';
import App from './App.vue';
const {app, router, store} = createApp()
export default context => {
    const  prefetchFns = []
      // 找到所有 prefetchData 方法
    const components = App.components 
    for (let key in components) {
      if (!components.hasOwnProperty(key)) continue;
      let component = components[key];
      if(component.asyncData) {
          prefetchFns.push(component.asyncData({
              store
          }))
      }
    }
    // 当所有的组件的数据请求完成以后再将store已经app 返回
    return Promise.all(prefetchFns).then((res) => {
        res.forEach((item, key) => {
            Vue.set(store.state, `${item.tagName}`, item.data);
        });
        context.state = store.state;
        return app;
    });
}
```
----
#### 当我们把服务端代码运行起来后异步调用组件里面asyncData 

test.vue
```
<template>
  <div>
    {{weather}}
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg: "test"
    }
  },
  // 服务端来调用该函数
  asyncData({store}) {
    return store.dispatch('GET_WEATHER') 
  },
  computed: {
    weather () {
      return this.$store.state.weather
    }
  },
  mounted (){
    console.log(this.$store.state.route)
  
  },
}
</script>

```
### webpack.server 打包配置
```
const merge = require('webpack-merge');
const webpack  = require('webpack');
const base = require('./webpack.base.conf.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
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
```


### webpack.client.js 客户端打包配置
```
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
    // 因为VueSSRClientPlugin 插件生成bundle 所以这里不需要再生成html模板了
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
```

### webpack.base.js

```
[Vue warn]: Error in beforeCreate hook: "ReferenceError: window is not defined"
found in
---> <App> at src/App.vue
       <Root>
error during render : /
ReferenceError: window is not defined
    at n (server-bundle.js:1:38316)
    at s (server-bundle.js:1:38404)
    at t.exports (server-bundle.js:1:41977)
    at Object.<anonymous> (server-bundle.js:1:7515)
    at r (server-bundle.js:1:186)
    at Module.<anonymous> (server-bundle.js:1:36978)
    at r (server-bundle.js:1:186)
    at VueComponent.<anonymous> (server-bundle.js:1:36829)
    at VueComponent.u (server-bundle.js:1:3491)
    at invokeWithErrorHandling (C:\Users\Administrator\Desktop\vue-ssr\node_modules\vue\dist\vue.runtime.common.dev.js:1850:57)
```
##### 需要注意的一个地方vue-style-loader  和 style-loader  默认的Webpack样式加载程序不是同构的
##### 所以当打包出来是没问题可是运行在服务端就会报错了后来在github也有人遇到同样的问题看到尤大大的回答
##### ![image](//cdn.files.qdfuns.com/article/content/picture/201904/16/181116foy7qgod0cz8t55t.png)
##### 所以在这里使用vue-style-loader
---
```
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
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,  // 这里需要引用vue-style-loader 不能用使用 style-loader
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
```

####  当启动ssr渲染的时候 使用 index.pro.html模板
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{ title }}</title>
</head>
<body> 
     <!-- <div id="app"></div> -->
      <!-- 使用ssr此处注释 -->
    <!--vue-ssr-outlet-->
</body>
</html>
```

#### 开发模式下使用 index.dev.html 模板

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>vue</title>
  </head>
  <body>
      <div id="app"></div>    
  </body>
</html>

```

#### 最后start.js node服务端代码
---
#### vue vue-server-renderer提供了 2个api方法 一个是 createRenderer() 和 createBundleRenderer()
##### createRenderer需要传一个vue的实列
##### createBundleRenderer无需传入app 实列对象通过webpack打包出来的bundle文件在使用 clientManifest 时，自动注入资源链接(asset links)和资源预加载提示(resource hints)
##### 最后通过renderToString()方法，将Vue实例转换为字符串插入到html文件
---


```
const express = require('express')
const fs = require('fs')
const path = require('path')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)

// 在这里将webpack 打包出来的文件引入进来
const clientBundle = require('./dist/vue-ssr-client-manifest.json') // 客户端 bundle
const serverBundle = require('./dist/vue-ssr-server-bundle.json')   // 服务的 bundle
const template = fs.readFileSync(resolve('./index.pro.html'), 'utf-8')  // 渲染模板
 
let renderer

  // 生成服务端渲染函数
function createRenderer (serverbundle, clientBundle ,template) {
  // 生成服务端渲染函数
  return createBundleRenderer(serverbundle, {
    // 推荐
    runInNewContext: false,
    // 模板html文件
    template: template,
    // client manifest
    clientManifest: clientBundle
  })
}

const serve = (path, cache) => express.static(resolve(path), { // 静态资源设置缓存
  maxAge: cache ? 60 * 60 * 24 * 30 : 0 
})

server.use('/dist', serve('./dist', true)) // 静态资源

renderer = createRenderer(serverBundle, clientBundle, template)

// 
function renderToString (context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html)
    })
  })
}

server.get('*',async(req, res) => {
  // 未渲染好返回
  if (!renderer) {
    return res.end('waiting for compilation... refresh in a moment.')
  }
  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404')
    } else {
      res.status(500).send('500')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }
 try {
    res.setHeader('Content-Type', 'text/html')
    const context = { title: 'SSR我来啦', url: req.url  }
    const html = await renderToString(context)
    res.send(html)
  } catch (error) {
    handleError(error)
  }
}) 
server.listen(8022, () => {
  console.log('访问：http://127.0.0.1:8022');
});

```


#### 项目梳理

#### 最后启动node服务测试ssr 服务端渲染查看页面源代码可以看到这一番景象服务端渲染成功了！
```
服务端渲染：http://127.0.0.1:8022/
客户端渲染：http://localhost:10085/
```
![image](//cdn.files.qdfuns.com/article/content/picture/201904/16/181114llhlmyhdnhvnpklg.png)

#### 首屏加载渲染速度对比通过谷歌浏览器开发者工具-performace面板来比较服务端渲染和客户端渲染

#### 通过几张图来对比看看

客户端渲染
![image](//cdn.files.qdfuns.com/article/content/picture/201904/16/181120yohphhkohztdbl6k.png)

服务端渲染
![image](//cdn.files.qdfuns.com/article/content/picture/201904/16/181118pw3r3eo0c95f0zp5.png)




































