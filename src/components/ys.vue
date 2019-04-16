<template>
  <div>
    <div style="border:1px solid #f00;padding:20px;">YS</div>
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
    debugger
    return store.dispatch('GET_ARTICLE') // 返回promise
  },
  
  mounted (){
    console.log(this.$store.state.route)
  },
}
</script>
