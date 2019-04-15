<template>
  <div>
    {{msg}}({{article.views}})
  </div>
</template>

<script>
export default {
  // 服务的操作
  asyncData({store}) {
    return store.dispatch('GET_WEATHER') // 返回promise
  },
  data() {
    return {
      msg: "子组件"
    }
  },
  computed: {
    article() {
      return this.$store.state.article
    }
  },
  
  created() {
    console.log('created------------子组child件执行服务端----------')
  },

  beforeCreate () {
    console.log('beforeCreate-------子组child件执行服务端-----------')
  },
  mounted (){
    console.log(this.$store.state.route)
  },
}
</script>
