import Router from 'vue-router'
import Vue from 'vue'
import Wang from '../components/wang.vue'
import Test from '../components/test.vue'
import YS from '../components/ys.vue'
Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
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
 

