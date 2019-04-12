<template>
  <div>
    {{msg}}({{article.views}})
  </div>
</template>

<script>
export default {
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
  // 服务的操作
  asyncData({store}) {
    return store.dispatch('SER_WEATHER') // 返回promise
  },
  created() {
    console.log('created------------子组件执行服务端----------')
  },

  beforeCreate () {
    console.log('beforeCreate-------子组件执行服务端-----------')
  },
  mounted (){
    console.log(this.$store.state.route)
  },
}
</script>
