import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

export  function createStore() {
  return new Vuex.Store({
    state: {
      article: {}
    },
    actions: {
      async GET_ARTICLE({commit}) {
        const {data} = await axios.get('https://www.86886.wang/api/article/5b38d0098c98760acf25bfac')
        commit('SET_ARTICLE', data)
      },

      async GET_WEATHER ({commit}) {
        const {data} = await axios.get('http://t.weather.sojson.com/api/weather/city/101030100')
        commit('SET_WEATHER', data)
      },
    
    },
    mutations: {
      SET_ARTICLE(state, data) {
        state.article = data.data
      },
      SET_ARTICLE_VIEWS (state, data) {
        state.article.views = data
      },
      SER_WEATHER(state, data) {
        state.weather = data
      }
    }
  })
}