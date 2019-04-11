import Router from 'vue-router'
import Vue from 'vue'
import Wang from '../components/wang.vue'
import Test from '../components/test.vue'
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
        path: '/test/:id',
        name: 'test',     
        component: Test
      }
    ]
  })
}
 

