import Vue from 'vue'
import Vuex from 'vuex'
import Search from '../components/Search.vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        current_user:'',
        favorites: [],
        forecast: [],
        cityName: ''
    },

    mutations:{
        setCurrentUser(state,hash){
            state.current_user = hash
        },

        setFavorites(state,array){
            state.favorites = array
        },

        setForecast(state,array){
            state.forecast = array
        },

        setCityName(state,name){
            state.cityName = name
        }

    },

    getters:{
        getCityName: state=> {
            return state.cityName
        }
    }
})
