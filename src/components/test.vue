<template>
  <div>
    {{weather}}
  </div>
</template>


<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      msg: "test"
    }
  },
  asyncData({store}) {
    return store.dispatch('GET_WEATHER') // 返回promise
  },
  // computed: {
  //   weather () {
  //     return this.$store.state.weather
  //   }
  // },
  computed: {
    ...mapState([
        'weather'
    ])
  },
  mounted (){
    console.log(this.$store.state.route)
  
  },
}
</script>
