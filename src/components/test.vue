<template>
  <div>
    {{weather}}
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
    return store.dispatch('GET_WEATHER') // 返回promise
  },
  computed: {
    weather () {
      return this.$store.state.weather
    }
  },
  mounted (){
    console.log(this.$store.state.route)
  
  },
}
</script>
