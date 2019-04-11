<template>
  <div>
    ys.vue
  </div>
</template>


<script>
export default {
  data() {
    return {
      msg: "ys"
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
