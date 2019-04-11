<template>
  <div>
    ys.vue
    <child></child>
  </div>
</template>


<script>
import child from './child.vue'
export default {
  data() {
    return {
      msg: "ys"
    }
  },
  components: {
    child,
  },
  asyncData({store}) {
    return store.dispatch('GET_ARTICLE') // 返回promise
  },
  
  mounted (){
    console.log(this.$store.state.route)
  },
}
</script>
