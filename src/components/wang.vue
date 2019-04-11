<template>
  <div>
      {{msg}}
      <div @click="getData" style="cursor: pointer;">点击</div>
      <div>{{article.views}}</div>
      <br/>  <br/>  <br/>
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
    return store.dispatch('GET_ARTICLE') // 返回promise
  },  
  created() {
    console.log('created------------客户端和服务端都执行----------')
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
      // 客户端操作state
      this.$store.commit('SET_ARTICLE_VIEWS', '客户端操作的store')
    }
  }
}
</script>
