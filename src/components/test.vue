<template>
  <div>
    测试
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg: "test"
    }
  },
  asyncData({store}) {
    // return store.dispatch('GET_ARTICLE') // 返回promise
  },
  mounted (){
    console.log(this.$store.state.route)
  
  },
}
</script>
