import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';

Vue.use(Vuex);

export  function createStore() {
  return new Vuex.Store({
    state: {
      article: {},
      weather: {}
    },
    actions: {
      async GET_ARTICLE({commit}) {
        try {
          const {data} = await axios.get('https://www.86886.wang/api/article/5b38d0098c98760acf25bfac')
          commit('SET_ARTICLE', data)
        } catch (ex) {
          console.log(ex)
        }
      },

      async GET_WEATHER ({commit}) {
        try {
        const {data} = await axios.get('http://t.weather.sojson.com/api/weather/city/101030100')
        commit('SET_WEATHER', data.data)
        } catch (ex) {
          console.log(ex)
        }
      },
    },
    mutations: {
      SET_ARTICLE(state, data) {
        state.article = data.data
      },
      SET_ARTICLE_VIEWS (state, data) {
        state.article.views = data
      },
      SET_WEATHER(state, data) {
        state.weather = data
      }
    }
  })
}