<template>
  <div>
      {{msg}}
      <br/><br/><br/>
      <div @click="getData" style="cursor: pointer;">点击</div>      
      <div>父组件({{article.views}})</div>   
      <div>{{article.content}}</div>
    </div>
</template>
<script>
import child from './child.vue'
import ys from './ys.vue'
export default {
  data() {
    return {
      msg: "本地数据（wangxiping）"
    }
  },
  components: {
    child,
    ys
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
