<template>
  <div>
      {{msg}}
      <div @click="getData">点击</div>
      <div>{{article.views}}</div>
      <div>{{article.content}}</div>
      <router-link :to="{path:'/test',query: {id: new Date()}}">测试</router-link>
    </div>
</template>


<script>
export default {
  data() {
    return {
      msg: "wangxiping"
    }
  },
  asyncData({store, route}) {
    debugger
    return store.dispatch('GET_ARTICLE') // 返回promise
  },
  
  created() {
    console.log('created--------------客户端和服务端都执行---------')
  },
  beforeCreate () {
    console.log('beforeCreate-------客户端和服务端都执行-----------')
  },
   computed: {
    article() {
      return this.$store.state.article
    }
  },
  mounted (){
    console.log(this.$store.state.route)
  
  },
  methods:{
    getData () {
      console.log(this)
    }
  }
}
</script>
